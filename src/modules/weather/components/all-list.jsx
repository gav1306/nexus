"use client";

import { useSuspenseQueries } from "@tanstack/react-query";
import { weatherListColumns, WeatherListDataTable } from "../components";
import { getWeatherDetails, weatherQueryKeys } from "../services";
import { CITY_LIST } from "../utils";

export const AllWeatherList = () => {
  const weatherQueries = Object.entries(CITY_LIST).map(([_, city]) => {
    const { latitude, longitude } = city;
    return {
      queryKey: weatherQueryKeys.details({
        latitude,
        longitude,
      }),
      queryFn: () =>
        getWeatherDetails({
          latitude,
          longitude,
        }),
      staleTime: 600000,
      refetchInterval: 600000,
      refetchIntervalInBackground: true,
    };
  });

  const results = useSuspenseQueries({
    queries: weatherQueries,
  });

  const isPending = results.some((query) => query.isPending);
  const isError = results.some((query) => query.isError);
  const isLoading = results.some((query) =>
    query.fetchStatus === "idle" ? false : isPending
  );

  const data = [];

  if (!isError && !isLoading) {
    results.forEach((query) => {
      const { data: weatherData } = query;
      data.push(weatherData);
    });
  }

  return (
    <WeatherListDataTable
      columns={weatherListColumns}
      data={data || []}
      isLoading={isLoading}
      isError={isError}
      emptyMessage="No weather found"
    />
  );
};
