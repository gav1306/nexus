import sunAnimation from "@/assets/animations/sun.json";
import cloudyAnimation from "@/assets/animations/cloudy.json";
import foggyAnimation from "@/assets/animations/foggy.json";
import lightDrizzleAnimation from "@/assets/animations/light-drizzle.json";
import heavyDrizzleAnimation from "@/assets/animations/heavy-drizzle.json";
import thunderCloudAnimation from "@/assets/animations/thunder-cloud.json";
import snowCloudAnimation from "@/assets/animations/snow-cloud.json";

export const DEFAULT_WEATHER_PARAMS = {
  current:
    "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,visibility,uv_index,precipitation",
  daily: "temperature_2m_min,temperature_2m_max,sunrise,sunset",
  timezone: "auto",
};

export const CITY_LIST = {
  delhi: { name: "New Delhi", latitude: 28.75, longitude: 77.125 },
  mumbai: { name: "Mumbai", latitude: 19.125, longitude: 72.875 },
  bangalore: { name: "Bengaluru", latitude: 13, longitude: 77.625 },
  chennai: { name: "Chennai", latitude: 13, longitude: 80.125 },
  kolkata: { name: "Kolkata", latitude: 22.625, longitude: 88.375 },
  kolkata: { name: "Kolkata", latitude: 22.625, longitude: 88.375 },
};

export const WEATHER_TYPES = [
  {
    from: 0,
    to: 0,
    icon: sunAnimation,
    description: "Clear Sky",
  },
  {
    from: 1,
    to: 3,
    icon: cloudyAnimation,
    description: "Partly Cloudy",
  },
  {
    from: 45,
    to: 48,
    icon: foggyAnimation,
    description: "Foggy",
  },
  {
    from: 51,
    to: 55,
    icon: lightDrizzleAnimation,
    description: "Drizzle",
  },
  {
    from: 61,
    to: 65,
    icon: heavyDrizzleAnimation,
    description: "Rain",
  },
  {
    from: 66,
    to: 67,
    icon: heavyDrizzleAnimation,
    description: heavyDrizzleAnimation,
  },
  {
    from: 71,
    to: 75,
    icon: snowCloudAnimation,
    description: "Snowfall",
  },
  {
    from: 77,
    to: 77,
    icon: snowCloudAnimation,
    description: "Heavy Snowfall",
  },
  {
    from: 95,
    to: 99,
    icon: thunderCloudAnimation,
    description: "Thunderstorm",
  },
];
