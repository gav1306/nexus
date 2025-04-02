import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/api";
import { cryptoQueryKeys, getCryptoList } from "../services";
import { List } from "../pages";

export async function HydratedCryptoList() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: cryptoQueryKeys.list(),
    queryFn: getCryptoList,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <List />
    </HydrationBoundary>
  );
}
