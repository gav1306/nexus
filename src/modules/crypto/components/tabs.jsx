import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoriteCryptoList } from "./favorite-list";
import { HydratedCryptoList } from "../hydrate";
import { CryptoNotificationDialog } from ".";

export function CryptoListTabs() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center justify-between">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <CryptoNotificationDialog />
      </div>
      <TabsContent value="all">
        <HydratedCryptoList />
      </TabsContent>
      <TabsContent value="favorites">
        <FavoriteCryptoList />
      </TabsContent>
    </Tabs>
  );
}
