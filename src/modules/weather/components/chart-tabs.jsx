import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoricalBarChart, HistoricalLineChart } from "../charts";
import { useWeatherChartStore } from "../store";

export function WeatherChartTabs() {
  const { setPastDays, filter } = useWeatherChartStore();

  return (
    <Tabs defaultValue="line">
      <div className="flex items-center justify-end gap-4">
        <Tabs value={filter.past_days} onValueChange={setPastDays}>
          <TabsList>
            <TabsTrigger value={3}>3D</TabsTrigger>
            <TabsTrigger value={7}>7D</TabsTrigger>
          </TabsList>
        </Tabs>
        <TabsList>
          <TabsTrigger value="line">Lines</TabsTrigger>
          <TabsTrigger value="bar">Bars</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="line">
        <HistoricalLineChart />
      </TabsContent>
      <TabsContent value="bar">
        <HistoricalBarChart />
      </TabsContent>
    </Tabs>
  );
}
