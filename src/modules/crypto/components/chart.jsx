"use client";

import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useSuspenseGetCryptoDetails } from "../services";
import { useParams } from "next/navigation";
import { useCryptoChartStore } from "../store";
import { CryptoChartTabs } from ".";

export const CryptoChart = () => {
  const { id } = useParams();
  const { filter } = useCryptoChartStore();
  const { data, isPending, isError } = useSuspenseGetCryptoDetails({
    ...filter,
    symbol: id,
  });

  const chartRef = useRef(null);

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log(data);

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
      case "15m": {
        baseInterval.timeUnit = "minute";
        baseInterval.count = 15;
        break;
      }
      case "1h": {
        baseInterval.timeUnit = "hour";
        baseInterval.count = 1;
        break;
      }
      case "6h": {
        baseInterval.timeUnit = "hour";
        baseInterval.count = 6;
        break;
      }
      case "1d": {
        baseInterval.timeUnit = "day";
        baseInterval.count = 1;
        break;
      }
      case "1w": {
        baseInterval.timeUnit = "week";
        baseInterval.count = 1;
        break;
      }

      default:
        break;
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
    const series = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        openValueYField: "open",
        lowValueYField: "low",
        highValueYField: "high",
        valueXField: "date",
        lowValueYGrouped: "low",
        highValueYGrouped: "high",
        openValueYGrouped: "open",
        valueYGrouped: "close",
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

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data, filter]);

  return (
    <div className="grid gap-4">
      <CryptoChartTabs />
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};
