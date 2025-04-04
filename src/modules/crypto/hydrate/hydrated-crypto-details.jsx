import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/services";
import { cryptoQueryKeys, getCrypto, getCryptoDetails } from "../services";
import { CryptoChart } from "../components";
import { initialFilterState } from "../store";

export async function HydratedCryptoDetails({ symbol }) {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: cryptoQueryKeys.chartDetails({ ...initialFilterState, symbol }),
    queryFn: () => getCryptoDetails({ ...initialFilterState, symbol }),
  });
  queryClient.prefetchQuery({
    queryKey: cryptoQueryKeys.details(symbol),
    queryFn: () => getCrypto(symbol),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CryptoChart />
    </HydrationBoundary>
  );
}
