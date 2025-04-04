import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/services";
import { getWeatherDetails, weatherQueryKeys } from "../services";
import { CITY_LIST } from "../utils";

export async function HydratedWeatherList({ children }) {
  const queryClient = getQueryClient();
  Object.entries(CITY_LIST).forEach(([_, city]) => {
    const { latitude, longitude } = city;
    queryClient.prefetchQuery({
      queryKey: weatherQueryKeys.details({ latitude, longitude }),
      queryFn: () => getWeatherDetails({ latitude, longitude }),
    });
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
