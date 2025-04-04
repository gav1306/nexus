import { WeatherDetails } from "@/modules/weather/pages";

export default async function Details({ params }) {
  const { id } = await params;

  return <WeatherDetails cityKey={id} />;
}
