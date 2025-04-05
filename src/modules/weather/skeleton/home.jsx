import { Skeleton } from "@/components/ui/skeleton";
import { Title } from "@/components/ui/title";

export const WeatherHomeLoading = () => {
  return (
    <section className="grid gap-4">
      <Title>Weather</Title>
      <div className="grid gap-2">
        <Skeleton className="w-[400px] h-[36px]" />
        <div className="grid grid-cols-4 gap-4 p-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              className="w-full aspect-[1/1.2] rounded-xl"
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
