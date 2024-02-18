import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CardDescription, CardTitle } from "../../ui/card";
import Tag from "../Tag";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  category: string[];
};

export default function ArticleButtonHoverCard({
  children,
  title,
  description,
  category,
}: Props) {
  function renderTags() {
    return category.map((tag) => <Tag key={tag} category={tag} />);
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side="right">
        <div className="flex flex-col gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="flex flex-row gap-2">{renderTags()}</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
