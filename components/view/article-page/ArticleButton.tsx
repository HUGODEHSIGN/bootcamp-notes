import ArticleButtonHoverCard from "./ArticleButtonHoverCard";
import Link from "next/link";

import { Button } from "../../ui/button";
import ArticleContextMenu from "../ArticleContextMenu";
import { ArticleType } from "../home/ArticleCardGrid";

type Props = {
  article: ArticleType;
  params: string;
};

export default function ArticleButton({ article, params }: Props) {
  return (
    <>
      <ArticleContextMenu article={article}>
        <ArticleButtonHoverCard
          description={article.description}
          category={article.category}
        >
          {params === article.id ? (
            <Button className="w-full justify-start" asChild>
              <Link href={`/${article.id}`}>{article.title}</Link>
            </Button>
          ) : (
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/${article.id}`}>{article.title}</Link>
            </Button>
          )}
        </ArticleButtonHoverCard>
      </ArticleContextMenu>
    </>
  );
}
