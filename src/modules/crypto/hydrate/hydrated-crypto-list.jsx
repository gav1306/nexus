import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/services";
import { cryptoQueryKeys, getCryptoList } from "../services";
import { AllCryptoList } from "../components";

export async function HydratedCryptoList() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: cryptoQueryKeys.list(),
    queryFn: getCryptoList,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AllCryptoList />
    </HydrationBoundary>
  );
}
