import { useSuspenseQuery } from "@tanstack/react-query";
import { openMeteoApi } from "@/services";
import { weatherQueryKeys } from "./query-keys";
import { DEFAULT_WEATHER_CHART_PARAMS } from "../utils";

export const getWeatherChart = async (params) => {
  const response = await openMeteoApi.get("/", {
    params: {
      ...DEFAULT_WEATHER_CHART_PARAMS,
      ...params,
    },
  });

  return response.data.daily.time.map((date, index) => {
    return {
      date,
      minTemp: response.data.daily.temperature_2m_min[index],
      maxTemp: response.data.daily.temperature_2m_max[index],
      precipitation: response.data.daily.precipitation_sum[index],
      windSpeed: response.data.daily.wind_speed_10m_max[index],
    };
  });
};

export const useSuspenseGetWeatherChart = (params) => {
  return useSuspenseQuery({
    queryKey: weatherQueryKeys.chart(params),
    queryFn: () => getWeatherChart(params),
  });
};
