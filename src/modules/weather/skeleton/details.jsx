import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const WeatherDetailsLoading = () => {
  return (
    <section className="grid h-full grid-rows-[auto_1fr] gap-4">
      <Button asChild variant="link" className="text-lg justify-self-start">
        <Link href="/crypto">
          <ArrowLeft /> Go Back
        </Link>
      </Button>
      <Skeleton className="h-[200px] md:h-[96px] w-full xl:hidden" />
      <div className="grid gap-2 h-full grid-rows-[auto_1fr]">
        <div className="flex justify-end items-center gap-4">
          <Skeleton className="w-[79.05px] h-[36px]" />
          <Skeleton className="w-[106.64px] h-[36px]" />
        </div>
        <Skeleton className="h-[250px] md:h-[400px] xl:h-[500px]" />
      </div>
    </section>
  );
};
