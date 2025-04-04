"use client";

import { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {
  useSuspenseGetCrypto,
  useSuspenseGetCryptoDetails,
  useGetCryptoMetaDetails,
} from "../services";
import { useParams } from "next/navigation";
import { useCryptoChartStore, useCryptoNotificationStore } from "../store";
import { CryptoChartTabs, InfoCard } from ".";
import { formatCurrency, SYMBOL_DETAILS } from "../utils";
import { Icons } from "@/assets/icons";
import { useWebSocket } from "@/hooks";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const CryptoChart = () => {
  const { id: symbol } = useParams();
  const [showAllDescription, setShowAllDescription] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const valueSeriesRef = useRef(null);
  const stockChartRef = useRef(null);
  const stockLabelRef = useRef(null);
  const rootRef = useRef(null);
  const priceChangeRef = useRef(null);
  const priceChangePercentRef = useRef(null);
  const weightedPriceRef = useRef(null);
  const volumeRef = useRef(null);
  const currentValueDataItemRef = useRef(null);
  const { filter } = useCryptoChartStore();
  const { data: detailsData } = useSuspenseGetCrypto(symbol);
  const { data: metaDetailsData, isPending: metaDetailsPending } =
    useGetCryptoMetaDetails(symbol);
  const { data: chartDetailsData } = useSuspenseGetCryptoDetails({
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
      const {
        c: currentPrice,
        p: priceChange,
        P: priceChangePercent,
        w: weightedPrice,
        w: totalVolume,
      } = data;
      const priceEl = priceElRef.current;
      const priceChangeEl = priceChangeRef.current;
      const priceChangePercentEl = priceChangePercentRef.current;
      const weightedPriceEl = weightedPriceRef.current;
      const volumeEl = volumeRef.current;

      if (priceChangeEl) {
        priceChangeEl.innerText = formatCurrency(priceChange);
      }
      if (priceChangePercentEl) {
        priceChangePercentEl.innerText = formatCurrency(priceChangePercent);
      }
      if (weightedPriceEl) {
        weightedPriceEl.innerText = formatCurrency(weightedPrice);
      }
      if (volumeEl) {
        volumeEl.innerText = formatCurrency(totalVolume);
      }

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
        priceEl.innerText = formatCurrency(currentPrice);
        const priceDifference = Math.abs(currentPrice - prevPrice);
        if (priceDifference >= threshold) {
          toast.info(
            `Price of ${name} changed from ${formatCurrency(
              prevPrice
            )} to ${formatCurrency(currentPrice)}`
          );
        }
      }
    }
  );

  useWebSocket(
    `${
      process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET
    }?streams=${symbol.toLocaleLowerCase()}@kline_${filter.interval}`,
    ({ data }) => {
      const {
        E: date,
        k: { c: value, o: open, l: low, h: high },
      } = data;

      const newData = {
        date,
        value,
        open,
        low,
        high,
      };
      valueSeriesRef.current.data.push(newData);

      if (stockLabelRef.current) {
        currentValueDataItemRef.current.animate({
          key: "value",
          to: value,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic),
        });
        stockLabelRef.current.set(
          "text",
          stockChartRef.current.getNumberFormatter().format(value)
        );
        const bg = stockLabelRef.current.get("background");
        if (bg) {
          if (value < open) {
            bg.set("fill", rootRef.current.interfaceColors.get("negative"));
          } else {
            bg.set("fill", rootRef.current.interfaceColors.get("positive"));
          }
        }
      }
    }
  );

  useEffect(() => {
    if (!chartDetailsData) {
      return;
    }

    const axisColor = isDarkMode ? "#9c9ba6" : "#000000";
    const root = am5.Root.new("chartdiv");
    root.interfaceColors.set("grid", am5.color(axisColor));
    root.interfaceColors.set("text", am5.color(axisColor));
    rootRef.current = root;

    rootRef.current.setThemes([am5themes_Animated.new(rootRef.current)]);

    stockChartRef.current = rootRef.current.container.children.push(
      am5stock.StockChart.new(rootRef.current, {
        paddingRight: 0,
      })
    );

    rootRef.current.numberFormatter.set("numberFormat", "#,###.00");

    const mainPanel = stockChartRef.current.panels.push(
      am5stock.StockPanel.new(rootRef.current, {
        wheelY: "zoomX",
        panX: true,
        panY: true,
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

    const dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(rootRef.current, {
        extraMax: 0.1,
        baseInterval,
        renderer: am5xy.AxisRendererX.new(rootRef.current, {
          pan: "zoom",
        }),
        tooltip: am5.Tooltip.new(rootRef.current, {}),
      })
    );

    const valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(rootRef.current, {
        renderer: am5xy.AxisRendererY.new(rootRef.current, {
          pan: "zoom",
        }),
        tooltip: am5.Tooltip.new(rootRef.current, {}),
        numberFormat: "#,###.00",
        extraTooltipPrecision: 2,
      })
    );

    currentValueDataItemRef.current = valueAxis.createAxisRange(
      valueAxis.makeDataItem({ value: 0 })
    );
    stockLabelRef.current = currentValueDataItemRef.current.get("label");
    if (stockLabelRef.current) {
      stockLabelRef.current.setAll({
        fill: am5.color(0xffffff),
        background: am5.Rectangle.new(rootRef.current, {
          fill: am5.color(0x000000),
        }),
      });
    }

    const currentGrid = currentValueDataItemRef.current.get("grid");
    if (currentGrid) {
      currentGrid.setAll({
        stroke: am5.color(axisColor),
        strokeOpacity: 0.5,
        strokeDasharray: [2, 5],
      });
    }

    valueSeriesRef.current = mainPanel.series.push(
      am5xy.CandlestickSeries.new(rootRef.current, {
        name: symbol,
        xAxis: dateAxis,
        yAxis: valueAxis,
        valueYField: "value",
        openValueYField: "open",
        lowValueYField: "low",
        highValueYField: "high",
        valueXField: "date",
        tooltip: am5.Tooltip.new(rootRef.current, {
          pointerOrientation: "horizontal",
          labelText:
            "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}",
        }),
      })
    );

    mainPanel.set(
      "cursor",
      am5xy.XYCursor.new(rootRef.current, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeriesRef.current],
        snapToSeriesBy: "y!",
      })
    );

    stockChartRef.current.set("stockSeries", valueSeriesRef.current);

    valueSeriesRef.current.data.setAll(chartDetailsData);

    valueSeriesRef.current.appear(1000);
    stockChartRef.current.appear(1000, 100);

    return () => {
      rootRef.current.dispose();
    };
  }, [chartDetailsData, filter, isDarkMode]);

  const { name, icon } = SYMBOL_DETAILS[symbol];
  const IconComponent = Icons[icon];

  const toggleMoreDescriptionHandler = () => {
    setShowAllDescription((prevState) => !prevState);
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <Button asChild variant="link" className="text-lg justify-self-start">
        <Link href="/crypto">
          <ArrowLeft /> Go Back
        </Link>
      </Button>
      <h1 className="flex items-center gap-4 text-4xl font-bold">
        <IconComponent width={60} height={60} /> {name}
      </h1>

      <div className="grid h-full grid-cols-[0.7fr_2fr]">
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <span
            className="font-bold text-2xl"
            data-price={chartDetailsData[chartDetailsData.length - 1].value}
            ref={priceElRef}
          >
            {formatCurrency(
              chartDetailsData[chartDetailsData.length - 1].value
            )}
          </span>
          <div>
            <div className="grid grid-cols-2 gap-2">
              <InfoCard
                title="Price Change"
                info="Price change in the last 24 hours."
                content={formatCurrency(detailsData.priceChange)}
                ref={priceChangeRef}
              />
              <InfoCard
                title="Change Percent"
                info="Price change percentage in 24h."
                content={formatCurrency(detailsData.priceChangePercent)}
                ref={priceChangePercentRef}
              />
              <InfoCard
                title="VWAP"
                info="Weighted average price in 24h."
                content={formatCurrency(detailsData.weightedAvgPrice)}
                ref={weightedPriceRef}
              />
              <InfoCard
                title="Volume"
                info={`Total ${name} traded in the last 24h.`}
                content={formatCurrency(detailsData.volume)}
                ref={volumeRef}
              />
              <InfoCard
                title="Market Cap"
                info={`The total value of all ${name} coins currently in circulation.`}
                content={
                  metaDetailsData
                    ? formatCurrency(
                        metaDetailsData.market_data.market_cap.usd,
                        { notation: "compact" }
                      )
                    : ""
                }
                isLoading={metaDetailsPending}
              />
              <InfoCard
                title="Circulating Supply"
                info={`The number of ${name} coins currently available in the market and actively being traded.`}
                content={
                  metaDetailsData
                    ? formatCurrency(
                        metaDetailsData.market_data.circulating_supply,
                        { notation: "compact" }
                      )
                    : ""
                }
                isLoading={metaDetailsPending}
              />
              <InfoCard
                title="Max Supply"
                info={`The maximum number of ${name} coins that can ever exist.`}
                content={
                  metaDetailsData
                    ? formatCurrency(metaDetailsData.market_data.max_supply, {
                        notation: "compact",
                      })
                    : ""
                }
                isLoading={metaDetailsPending}
              />
              <InfoCard
                title="Total Supply"
                info={`The total number of ${name} coins that have been created.`}
                content={
                  metaDetailsData
                    ? formatCurrency(metaDetailsData.market_data.total_supply, {
                        notation: "compact",
                      })
                    : ""
                }
                isLoading={metaDetailsPending}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-2 h-full grid-rows-[auto_1fr]">
          <CryptoChartTabs />
          <div
            id="chartdiv"
            style={{ width: "100%", height: "100%", minHeight: "500px" }}
          />
        </div>
      </div>
      <div className="mt-5">
        {metaDetailsPending && <Skeleton className="w-full h-[100px]" />}
        {metaDetailsData && (
          <div className="font-thin">
            <p
              className={cn("inline", { "line-clamp-3": !showAllDescription })}
            >
              {metaDetailsData.description.en}{" "}
            </p>
            <Button
              size="icon"
              variant="link"
              className="inline text-md h-auto"
              onClick={toggleMoreDescriptionHandler}
            >
              {showAllDescription ? "show less" : "show more"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
