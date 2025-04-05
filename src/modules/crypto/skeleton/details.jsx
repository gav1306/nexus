import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const CryptoDetailsLoading = () => {
  return (
    <section className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <Button asChild variant="link" className="text-lg justify-self-start">
        <Link href="/crypto">
          <ArrowLeft /> Go Back
        </Link>
      </Button>
      <div className="flex items-center gap-4">
        <Skeleton className="w-[60px] h-[60px] rounded-full" />
        <Skeleton className="w-[130px] h-[40px]" />
      </div>

      <div className="grid h-full gap-4 grid-cols-[0.7fr_2fr]">
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <Skeleton className="h-[32px] w-[150px]" />
          <div>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton className="w-full h-[86px]" key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2 h-full grid-rows-[auto_1fr]">
          <div className="flex justify-end items-center gap-2">
            <Skeleton className="w-[186.5px] h-[36px]" />
            <Skeleton className="w-[42px] h-[36px]" />
          </div>
          <Skeleton className="h-[500px]" />
        </div>
      </div>
      <div className="mt-5">
        <Skeleton className="w-full h-[100px]" />
      </div>
    </section>
  );
};
