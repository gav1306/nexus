import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../utils";

export const NewsImage = ({ url, author }) => {
  return (
    <Avatar className="w-20 h-20 rounded-sm border">
      <AvatarImage className="object-cover" src={url} alt={`@${author}`} />
      <AvatarFallback className="text-4xl uppercase">
        {getInitials(author || "")}
      </AvatarFallback>
    </Avatar>
  );
};
