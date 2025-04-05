"use client";

import { useParams } from "next/navigation";
import { CITY_LIST, formatTime } from "../utils";
import { useSuspenseGetWeatherDetails } from "../services";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Droplet,
  MapPin,
  Sun,
  SunDim,
  SunMoon,
  ThermometerSun,
  Wind,
} from "lucide-react";
import { WeatherChartTabs } from ".";

export const WeatherChartDetails = () => {
  const { id: cityKey } = useParams();

  const { latitude, longitude, name } = CITY_LIST[cityKey];
  const { data } = useSuspenseGetWeatherDetails({ latitude, longitude });
  const { temperature_2m, wind_speed_10m, relative_humidity_2m, uv_index } =
    data.current;
  const { sunset, sunrise } = data.daily;
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-4">
      <Button asChild variant="link" className="text-lg justify-self-start">
        <Link href="/weather">
          <ArrowLeft /> Go Back
        </Link>
      </Button>
      <div className="grid h-full gap-4 xl:grid-cols-[0.7fr_2fr]">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-1 justify-center gap-6">
          <li className="flex items-center gap-4">
            <MapPin className="w-[20px] md:w-[40px]" />
            <span className="text-2xl sm:text-3xl font-thin">{name}</span>
          </li>
          <li className="flex items-center gap-4">
            <ThermometerSun className="w-[20px] md:w-[40px]" />
            <span className="text-2xl sm:text-3xl font-thin">
              {temperature_2m}°C
            </span>
          </li>
          {!!sunrise.length && (
            <li className="flex items-center gap-4">
              <Sun className="w-[20px] md:w-[40px]" />
              <span className="text-2xl sm:text-3xl font-thin">
                {formatTime(sunrise[0])}
              </span>
            </li>
          )}
          {!!sunset.length && (
            <li className="flex items-center gap-4">
              <SunMoon className="w-[20px] md:w-[40px]" />
              <span className="text-2xl sm:text-3xl font-thin">
                {formatTime(sunset[0])}
              </span>
            </li>
          )}
          <li className="flex items-center gap-4">
            <Wind className="w-[20px] md:w-[40px]" />
            <span className="text-2xl sm:text-3xl font-thin">
              {wind_speed_10m} km/h
            </span>
          </li>
          <li className="flex items-center gap-4">
            <Droplet className="w-[20px] md:w-[40px]" />
            <span className="text-2xl sm:text-3xl font-thin">
              {relative_humidity_2m}%
            </span>
          </li>
          <li className="flex items-center gap-4">
            <SunDim className="w-[20px] md:w-[40px]" />
            <span className="text-2xl sm:text-3xl font-thin">{uv_index}</span>
          </li>
        </ul>
        <WeatherChartTabs />
      </div>
    </div>
  );
};
