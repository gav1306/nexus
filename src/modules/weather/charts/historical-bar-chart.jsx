"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useParams } from "next/navigation";
import { CITY_LIST } from "../utils";
import { useSuspenseGetWeatherChart } from "../services";
import { useWeatherChartStore } from "../store";

const chartConfig = {
  minTemp: {
    label: "Min Temp",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  maxTemp: {
    label: "Max Temp",
    color: "hsl(212 95% 68%)",
  },
  precipitation: {
    label: "Precipitation",
    color: "hsl(216 92% 60%)",
  },
  windSpeed: {
    label: "wind Speed",
    color: "hsl(210 98% 78%)",
  },
};

export function HistoricalBarChart() {
  const { id: cityKey } = useParams();
  const { filter } = useWeatherChartStore();

  const { latitude, longitude } = CITY_LIST[cityKey];

  const { data } = useSuspenseGetWeatherChart({
    latitude,
    longitude,
    ...filter,
  });

  return (
    <ChartContainer
      className="h-auto md:h-[400px] xl:h-full w-full xl:min-h-[500px]"
      config={chartConfig}
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="minTemp" fill="var(--color-minTemp)" radius={4} />
        <Bar dataKey="maxTemp" fill="var(--color-maxTemp)" radius={4} />
        <Bar
          dataKey="precipitation"
          fill="var(--color-precipitation)"
          radius={4}
        />
        <Bar dataKey="windSpeed" fill="var(--color-windSpeed)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
