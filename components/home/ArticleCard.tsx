import { ArticleType } from "./ArticleCardGrid";
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
  article: ArticleType;
};

// component takes props from ArticleGrid
export default function ArticleCard({ article }: Props) {
  const [filter, setFilter] = useAtom(filterAtom);

  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);
  const [selectedArticle, setSelectedArticle] = useAtom(selectedArticleAtom);

  if (!article) {
    return;
  }

  function renderTags() {
    if (Array.isArray(article.category)) {
      return article.category.map((tag) => (
        <div key={tag}>
          <Tag category={tag} />
        </div>
      ));
    }
  }

  // render component
  return (
    <Link href={linkIsDisabled ? "#" : `/${article.id}`}>
      <ArticleCardContextMenu article={article}>
        <Card
          className="hover:bg-secondary h-[145px]"
          // onClick={() => setSelectedArticle(article.title)}
        >
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>{article.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-row gap-2">{renderTags()}</div>
          </CardFooter>
        </Card>
      </ArticleCardContextMenu>
    </Link>
  );
}
