import ArticleCardContextMenu from "./ArticleCardContextMenu";
import { Badge } from "./ui/badge";
import { disableLinkAtom, filterAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: React.ReactNode;
  category: string[] | React.ReactNode;
  docId: string;
};

// component takes props from ArticleGrid
export default function ArticleCard({
  title,
  description,
  category,
  docId,
}: Props) {
  const [filter, setFilter] = useAtom(filterAtom);

  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);

  function renderTags() {
    if (Array.isArray(category)) {
      return category.map((tag) => (
        <Badge
          key={tag}
          onClick={() => {
            setFilter(tag);
          }}
          onMouseEnter={() => {
            setLinkIsDisabled(true);
          }}
          onMouseLeave={() => {
            setLinkIsDisabled(false);
          }}
        >
          {tag}
        </Badge>
      ));
    }
  }

  // render component
  return (
    <Link href={linkIsDisabled ? "#" : `/${title}`}>
      <ArticleCardContextMenu title={title} docId={docId}>
        <Card className="hover:bg-secondary h-[145px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-row gap-2">{renderTags()}</div>
          </CardFooter>
        </Card>
      </ArticleCardContextMenu>
    </Link>
  );
}
