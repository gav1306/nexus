"use client";

import { CardHoverEffect } from "@/components/ui/card-hover-effect";
import { CITY_LIST } from "../utils";
import { getWeatherDetails, weatherQueryKeys } from "../services";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useFavoriteWeatherStore } from "../store";
import { Empty, WeatherCard } from ".";
import Link from "next/link";

export const FavoriteWeatherList = () => {
  const { favorites } = useFavoriteWeatherStore();

  const weatherQueries = favorites.map((city) => {
    const { latitude, longitude } = CITY_LIST[city];
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

  console.log(data);

  if (!data.length) {
    return (
      <Empty
        message="No favorite cities"
        description="Please add cities to favorites from all tabs"
      />
    );
  }

  return (
    <CardHoverEffect className="grid-cols-4">
      {data.map((cityWeather) => {
        const [cityKey] = Object.entries(CITY_LIST).find(([_, city]) => {
          const { latitude, longitude } = city;
          const { latitude: rowLatitude, longitude: rowLongitude } =
            cityWeather;
          return latitude === rowLatitude && longitude === rowLongitude;
        });

        return (
          <Link href={`/weather/${cityKey}`}>
            <WeatherCard cityWeather={cityWeather} />
          </Link>
        );
      })}
    </CardHoverEffect>
  );
};
