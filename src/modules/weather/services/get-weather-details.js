import { useSuspenseQuery } from "@tanstack/react-query";
import { openMeteoApi } from "@/services";
import { weatherQueryKeys } from "./query-keys";
import { DEFAULT_WEATHER_PARAMS } from "../utils";

export const getWeatherDetails = async (params) => {
  const response = await openMeteoApi.get("/", {
    params: {
      ...DEFAULT_WEATHER_PARAMS,
      ...params,
    },
  });

  return response.data;
};

export const useSuspenseGetWeatherDetails = (params) => {
  return useSuspenseQuery({
    queryKey: weatherQueryKeys.details(params),
    queryFn: () => getWeatherDetails(params),
    staleTime: 600000,
    refetchInterval: 600000,
    refetchIntervalInBackground: true,
  });
};
