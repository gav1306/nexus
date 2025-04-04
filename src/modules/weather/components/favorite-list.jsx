"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardHoverEffect } from "@/components/ui/card-hover-effect";
import { CITY_LIST, formatTime, WEATHER_TYPES } from "../utils";
import { getWeatherDetails, weatherQueryKeys } from "../services";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useFavoriteWeatherStore } from "../store";
import { MapPin, Star, SunDim, Wind } from "lucide-react";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Empty } from ".";
import Link from "next/link";

export const FavoriteWeatherList = () => {
  const { favorites, removeFromFavorites } = useFavoriteWeatherStore();

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
        const {
          temperature_2m,
          wind_speed_10m,
          relative_humidity_2m,
          uv_index,
          weather_code,
        } = cityWeather.current;
        const { sunset, sunrise } = cityWeather.daily;
        const [cityKey, city] = Object.entries(CITY_LIST).find(([_, city]) => {
          const { latitude, longitude } = city;
          const { latitude: rowLatitude, longitude: rowLongitude } =
            cityWeather;
          return latitude === rowLatitude && longitude === rowLongitude;
        });

        const { name } = city;

        const currentWeather = WEATHER_TYPES.find(({ from, to }) => {
          return weather_code >= from && weather_code <= to;
        });

        return (
          <Link href={`/weather/${cityKey}`}>
            <Card className="aspect-[1/1.2] py-0 overflow-hidden relative grid grid-rows-[1fr_auto] gap-2">
              <CardContent className="grid place-items-center place-content-center gap-4 bg-muted">
                <Tooltip>
                  <TooltipTrigger
                    className="cursor-pointer h-auto w-auto absolute top-4 right-4 text-amber-200"
                    onClick={removeFromFavorites.bind(null, cityKey)}
                  >
                    <Star className="fill-amber-200" size={28} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove from favorites</p>
                  </TooltipContent>
                </Tooltip>
                {currentWeather && (
                  <LottieAnimation
                    className="absolute opacity-50 top-[-120px] left-[-120px] w-[320px]"
                    animationData={currentWeather.icon}
                  />
                )}
                <h3 className="relative text-4xl font-bold text-center">
                  {temperature_2m}
                  <span className="absolute top-[-4px] right-[-24px] text-4xl">
                    °
                  </span>
                </h3>
                <h4 className="flex items-center gap-1">
                  <MapPin size={16} /> <span>{name}</span>
                </h4>
                <div className="grid text-sm font-thin justify-center items-center">
                  {!!sunrise.length && (
                    <span className="text-center">
                      Sunrise at {formatTime(sunrise[0])}
                    </span>
                  )}
                  {!!sunset.length && (
                    <span className="text-center">
                      Sunset at {formatTime(sunset[0])}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="text-sm py-4 font-thin grid grid-cols-3">
                <div className="grid gap-0.5 justify-center">
                  <span className="flex items-center gap-1">
                    <Wind size={14} /> Wind
                  </span>
                  <span className="block text-center">
                    {wind_speed_10m} km/h
                  </span>
                </div>
                <div className="grid gap-0.5 justify-center">
                  <span className="flex items-center gap-1">
                    <Wind size={14} /> Wind
                  </span>
                  <span className="block text-center">
                    {relative_humidity_2m}%
                  </span>
                </div>
                <div className="grid gap-0.5 justify-center">
                  <span className="flex items-center gap-1">
                    <SunDim size={14} /> UVI
                  </span>
                  <span className="block text-center">{uv_index}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </CardHoverEffect>
  );
};
