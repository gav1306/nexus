import { Skeleton } from "@/components/ui/skeleton";
import { Title } from "@/components/ui/title";

export const CryptoHomeLoading = () => {
  return (
    <section className="grid gap-4">
      <Title>Market Overview</Title>
      <div className="grid gap-2">
        <div className="flex items-center gap-4 justify-between">
          <Skeleton className="w-full md:w-[400px] h-[36px]" />
          <Skeleton className="w-[42px] h-[36px]" />
        </div>
        <Skeleton className="w-full h-[304.5px]" />
      </div>
    </section>
  );
};
