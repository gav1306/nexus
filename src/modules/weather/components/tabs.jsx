import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllWeatherList, FavoriteWeatherList } from ".";

export function WeatherListTabs() {
  return (
    <Tabs defaultValue="favorites">
      <div className="flex items-center justify-between">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="favorites">
        <FavoriteWeatherList />
      </TabsContent>
      <TabsContent value="all">
        <AllWeatherList />
      </TabsContent>
    </Tabs>
  );
}
