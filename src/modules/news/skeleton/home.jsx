import { Skeleton } from "@/components/ui/skeleton";
import { Title } from "@/components/ui/title";

export const NewsHomeLoading = () => {
  return (
    <section className="grid gap-4">
      <Title>Top 10 News</Title>
      <ul className="grid gap-4">
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <li key={index}>
              <Skeleton className="w-full h-[200px]" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
