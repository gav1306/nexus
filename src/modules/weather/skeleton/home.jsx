import { Skeleton } from "@/components/ui/skeleton";
import { Title } from "@/components/ui/title";

export const WeatherHomeLoading = () => {
  return (
    <section className="grid gap-4">
      <Title>Weather</Title>
      <div className="grid gap-2">
        <Skeleton className="w-full md:w-[400px] h-[36px]" />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              className="w-full h-[268px] sm:h-auto sm:aspect-[1/1.2] rounded-xl"
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
