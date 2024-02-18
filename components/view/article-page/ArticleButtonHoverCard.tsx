import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Tag from "@/components/view/Tag";

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
  // renders out all the tags for a particular article
  function renderTags() {
    return category.map((tag) => <Tag key={tag} category={tag} />);
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side="right">
        <div className="flex flex-col gap-2">
          {/* showing full article title here to counteract downside of truncated title on button */}
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="flex flex-row gap-2">{renderTags()}</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
