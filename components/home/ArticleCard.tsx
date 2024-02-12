import { disableLinkAtom, filterAtom, selectedArticleAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ArticleCardContextMenu from "../all/ArticleCardContextMenu";
import Tag from "../all/Tag";

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
  const [selectedArticle, setSelectedArticle] = useAtom(selectedArticleAtom);

  function renderTags() {
    if (Array.isArray(category)) {
      return category.map((tag) => (
        <Tag category={tag} />

        // <Badge
        //   key={tag}
        //   onClick={() => {
        //     setFilter(tag);
        //   }}

        // >
        //   {tag}
        // </Badge>
      ));
    }
  }

  // render component
  return (
    <Link href={linkIsDisabled ? "#" : `/${title}`}>
      <ArticleCardContextMenu title={title} docId={docId}>
        <Card
          className="hover:bg-secondary h-[145px]"
          onClick={() => setSelectedArticle(title)}
        >
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
