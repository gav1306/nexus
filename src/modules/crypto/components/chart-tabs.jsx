import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CryptoNotificationDialog } from ".";
import { useCryptoChartStore } from "../store";

export function CryptoChartTabs() {
  const { setFilter, filter } = useCryptoChartStore();

  let interval = "1d";

  switch (filter.interval) {
    case "1h": {
      interval = "7d";
      break;
    }
    case "4h": {
      interval = "1m";
      break;
    }
    case "12h": {
      interval = "3m";
      break;
    }
    case "3d": {
      interval = "1y";
      break;
    }
  }

  return (
    <Tabs value={interval} onValueChange={setFilter} className="w-full">
      <div className="flex items-center justify-end gap-4">
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
