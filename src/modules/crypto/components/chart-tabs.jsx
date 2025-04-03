import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CryptoNotificationDialog } from ".";
import { useCryptoChartStore } from "../store";

export function CryptoChartTabs() {
  const { setFilter, filter } = useCryptoChartStore();
  return (
    <Tabs value={filter.interval} onValueChange={setFilter} className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="15m">1D</TabsTrigger>
          <TabsTrigger value="1h">7D</TabsTrigger>
          <TabsTrigger value="6h">1M</TabsTrigger>
          <TabsTrigger value="1d">3M</TabsTrigger>
          <TabsTrigger value="1w">1Y</TabsTrigger>
        </TabsList>
        <CryptoNotificationDialog />
      </div>
    </Tabs>
  );
}
