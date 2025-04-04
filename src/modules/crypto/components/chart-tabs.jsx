import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CryptoNotificationDialog } from ".";
import { useCryptoChartStore } from "../store";

export function CryptoChartTabs() {
  const { setFilter } = useCryptoChartStore();
  return (
    <Tabs defaultValue="1d" onValueChange={setFilter} className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="1d">1D</TabsTrigger>
          <TabsTrigger value="7d">7D</TabsTrigger>
          <TabsTrigger value="1m">1M</TabsTrigger>
          <TabsTrigger value="3m">3M</TabsTrigger>
          <TabsTrigger value="1y">1Y</TabsTrigger>
        </TabsList>
        <CryptoNotificationDialog />
      </div>
    </Tabs>
  );
}
