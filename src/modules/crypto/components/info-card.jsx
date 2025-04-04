import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function InfoCard({ title, info, content, ref, isLoading }) {
  return (
    <Card className="p-0 rounded-sm gap-0">
      <CardHeader className="pt-2 px-1 pb-0 gap-0">
        <CardTitle className="flex flex-col text-sm font-thin justify-center items-center gap-2">
          <Tooltip>
            <TooltipTrigger>
              <Info width={12} height={12} />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{info}</p>
            </TooltipContent>
          </Tooltip>
          <span className="line-clamp-1 font-medium">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent
        ref={ref}
        className="text-center text-primary font-semibold py-2 px-1 text-sm"
      >
        {isLoading && <Skeleton className="w-full h-5 rounded-xs" />}
        {content && content}
      </CardContent>
    </Card>
  );
}
