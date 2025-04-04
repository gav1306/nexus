"use client";

import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useSuspenseGetCryptoDetails } from "../services";
import { useParams } from "next/navigation";
import { useCryptoChartStore, useCryptoNotificationStore } from "../store";
import { CryptoChartTabs } from ".";
import { formatCurrency, SYMBOL_DETAILS } from "../utils";
import { Icons } from "@/assets/icons";
import { useWebSocket } from "@/hooks";
import { toast } from "sonner";

export const CryptoChart = () => {
  const { id: symbol } = useParams();
  const seriesRef = useRef(null);
  const chartRef = useRef(null);
  const { filter } = useCryptoChartStore();
  const { data } = useSuspenseGetCryptoDetails({
    ...filter,
    symbol,
  });
  const priceElRef = useRef(null);
  const { threshold } = useCryptoNotificationStore();
  useWebSocket(
    `${
      process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET
    }?streams=${symbol.toLocaleLowerCase()}@ticker`,
    ({ data }) => {
      const { s: symbol, c: currentPrice } = data;
      const priceEl = priceElRef.current;

      if (priceEl) {
        const prevPrice = +priceEl.dataset.price || 0;
        if (prevPrice > currentPrice) {
          priceEl.classList.add("text-red-500");
          priceEl.classList.remove("text-green-500");
        } else if (prevPrice < currentPrice) {
          priceEl.classList.add("text-green-500");
          priceEl.classList.remove("text-red-500");
        }
        priceEl.dataset.price = currentPrice;
        priceEl.innerText = `( ${formatCurrency(currentPrice)} )`;
        const priceDifference = Math.abs(currentPrice - prevPrice);
        if (priceDifference >= threshold) {
          const { name } = SYMBOL_DETAILS[symbol];
          toast.info(
            `Price of ${name} changed from ${formatCurrency(
              prevPrice
            )} to ${formatCurrency(currentPrice)}`
          );
        }
      }
    }
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    const root = am5.Root.new("chartdiv");
    chartRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );
    const baseInterval = { timeUnit: "minute", count: 15 };
    switch (filter.interval) {
      case "1h": {
        baseInterval.timeUnit = "hour";
        baseInterval.count = 1;
        break;
      }
      case "4h": {
        baseInterval.timeUnit = "hour";
        baseInterval.count = 4;
        break;
      }
      case "12h": {
        baseInterval.timeUnit = "hour";
        baseInterval.count = 12;
        break;
      }
      case "3d": {
        baseInterval.timeUnit = "day";
        baseInterval.count = 3;
        break;
      }
    }
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        visible: false,
        baseInterval,
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        visible: false,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    yAxis.get("renderer").grid.template.set("forceHidden", true);
    xAxis.get("renderer").grid.template.set("forceHidden", true);
    seriesRef.current = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        openValueYField: "open",
        lowValueYField: "low",
        highValueYField: "high",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText:
            "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}",
        }),
      })
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    seriesRef.current.data.setAll(data);

    seriesRef.current.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data, filter]);

  const { name, icon } = SYMBOL_DETAILS[symbol];
  const IconComponent = Icons[icon];

  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-4 text-4xl font-bold">
          <IconComponent width={60} height={60} /> {name}{" "}
        </h1>
        <span
          className="font-medium text-2xl"
          data-price={data[data.length - 1].value}
          ref={priceElRef}
        >{`( ${formatCurrency(data[data.length - 1].value)} )`}</span>
      </div>
      <CryptoChartTabs />
      <div id="chartdiv" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
