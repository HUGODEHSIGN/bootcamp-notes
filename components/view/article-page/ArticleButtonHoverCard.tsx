import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CardDescription } from "../../ui/card";
import Tag from "../Tag";

type Props = {
  children: React.ReactNode;
  description: string;
  category: string[];
};

export default function ArticleButtonHoverCard({
  children,
  description,
  category,
}: Props) {
  function renderTags() {
    return category.map((tag) => (
      <Tag key={description + category} category={tag} />
    ));
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side="right">
        <div className="flex flex-col gap-2">
          <CardDescription>{description}</CardDescription>
          <div className="flex flex-row gap-2">{renderTags()}</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
