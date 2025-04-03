import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoriteCryptoList } from "../pages";
import { HydratedCryptoList } from "../hydrate";

export function CryptoListTabs() {
  return (
    <Tabs defaultValue="all">
      <TabsList className="grid w-[400px] grid-cols-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <HydratedCryptoList />
      </TabsContent>
      <TabsContent value="favorites">
        <FavoriteCryptoList />
      </TabsContent>
    </Tabs>
  );
}
