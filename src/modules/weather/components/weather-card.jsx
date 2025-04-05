import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Droplet, MapPin, Star, SunDim, Wind } from "lucide-react";
import { CITY_LIST, formatTime, WEATHER_TYPES } from "../utils";
import { useFavoriteWeatherStore } from "../store";

export function WeatherCard({ cityWeather }) {
  const { removeFromFavorites } = useFavoriteWeatherStore();
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
    const { latitude: rowLatitude, longitude: rowLongitude } = cityWeather;
    return latitude === rowLatitude && longitude === rowLongitude;
  });

  const { name } = city;

  const currentWeather = WEATHER_TYPES.find(({ from, to }) => {
    return weather_code >= from && weather_code <= to;
  });

  const removeFromFavoritesHandler = (e) => {
    e.preventDefault();
    removeFromFavorites(cityKey);
  };

  return (
    <Card className="sm:aspect-[1/1.2] py-0 overflow-hidden relative grid grid-rows-[1fr_auto] gap-2">
      <CardContent className="grid place-items-center place-content-center py-6 gap-4 bg-secondary">
        <Tooltip>
          <TooltipTrigger
            className="cursor-pointer h-auto w-auto absolute top-4 right-4 text-amber-200"
            onClick={removeFromFavoritesHandler}
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
          <span className="absolute top-[-4px] right-[-24px] text-4xl">°</span>
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
          <span className="block text-center">{wind_speed_10m} km/h</span>
        </div>
        <div className="grid gap-0.5 justify-center">
          <span className="flex items-center gap-1">
            <Droplet size={14} /> Humidity
          </span>
          <span className="block text-center">{relative_humidity_2m}%</span>
        </div>
        <div className="grid gap-0.5 justify-center">
          <span className="flex items-center gap-1">
            <SunDim size={14} /> UVI
          </span>
          <span className="block text-center">{uv_index}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
