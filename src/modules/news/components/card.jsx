import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsImage } from "./image";
import { Clock1 } from "lucide-react";
import { formatSecondsToDate } from "../utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const NewsCard = ({
  TITLE,
  AUTHORS,
  IMAGE_URL,
  PUBLISHED_ON,
  URL,
  BODY,
}) => {
  return (
    <Card className="flex w-full gap-4 p-4 shadow-md">
      <CardContent className="p-0 grid gap-4 grid-cols-[auto_1fr] items-center">
        <NewsImage author={AUTHORS} url={IMAGE_URL} />
        <div className="grid gap-2">
          <CardHeader className="p-0 grid-rows-1">
            <CardTitle className="font-bold text-lg line-clamp-1">
              {TITLE}
            </CardTitle>
          </CardHeader>
          <div className="flex items-center gap-2 text-xs">
            <Badge>{AUTHORS}</Badge>
            <span className="flex items-center gap-1">
              <Clock1 className="w-4 h-4" />
              {formatSecondsToDate(PUBLISHED_ON)}
            </span>
          </div>
          <Link href={URL} target="_blank" className="text-sm hover:underline">
            {URL}
          </Link>
        </div>
      </CardContent>

      <CardFooter className="font-thin px-0 text-sm">
        <p className="line-clamp-4">{BODY}</p>
      </CardFooter>
    </Card>
  );
};
