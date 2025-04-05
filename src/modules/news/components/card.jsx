import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsImage } from "./image";
import { ChevronDown, Clock1 } from "lucide-react";
import { formatSecondsToDate } from "../utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md">
              {AUTHORS}
            </span>
            <span className="flex items-center gap-1">
              <Clock1 className="w-4 h-4" />
              {formatSecondsToDate(PUBLISHED_ON)}
            </span>
          </div>
          <a
            href={URL}
            target="_blank"
            className="text-xs hover:underline text-gray-400"
          >
            {URL}
          </a>
        </div>
      </CardContent>
      <CardFooter>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>read more</AccordionTrigger>
            <AccordionContent className="line-clamp-4">{BODY}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
};
