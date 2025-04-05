"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

export function HistoricalLineChart() {
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
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: -20,
          right: 12,
        }}
      >
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date"
          tickLine={true}
          axisLine={true}
          tickMargin={8}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <YAxis tickLine={true} axisLine={true} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="minTemp"
          type="natural"
          fill="var(--color-minTemp)"
          fillOpacity={0.4}
          stroke="var(--color-minTemp)"
          stackId="a"
        />
        <Area
          dataKey="maxTemp"
          type="natural"
          fill="var(--color-maxTemp)"
          fillOpacity={0.4}
          stroke="var(--color-maxTemp)"
          stackId="a"
        />
        <Area
          dataKey="precipitation"
          type="natural"
          fill="var(--color-precipitation)"
          fillOpacity={0.4}
          stroke="var(--color-precipitation)"
          stackId="a"
        />
        <Area
          dataKey="windSpeed"
          type="natural"
          fill="var(--color-windSpeed)"
          fillOpacity={0.4}
          stroke="var(--color-windSpeed)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
