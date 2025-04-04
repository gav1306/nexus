import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/services";
import { getWeatherChart, weatherQueryKeys } from "../services";
import { CITY_LIST } from "../utils";

export async function HydratedWeatherChart({ children, cityKey }) {
  const queryClient = getQueryClient();

  const { latitude, longitude } = CITY_LIST[cityKey];
  queryClient.prefetchQuery({
    queryKey: weatherQueryKeys.chart({ latitude, longitude }),
    queryFn: () => getWeatherChart({ latitude, longitude }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
