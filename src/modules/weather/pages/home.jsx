import { WeatherListTabs } from "../components";
import { HydratedWeatherList } from "../hydrate";

export const WeatherHome = () => {
  return (
    <section className="grid gap-4">
      <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        Weather
      </h1>
      <HydratedWeatherList>
        <WeatherListTabs />
      </HydratedWeatherList>
    </section>
  );
};
