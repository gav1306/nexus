import { WeatherChartDetails } from "../components";
import { HydratedWeatherChart } from "../hydrate";

export const WeatherDetails = ({ cityKey }) => {
  return (
    <HydratedWeatherChart cityKey={cityKey}>
      <WeatherChartDetails />
    </HydratedWeatherChart>
  );
};
