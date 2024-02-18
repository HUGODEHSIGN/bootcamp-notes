import ArticleButtonHoverCard from "./ArticleButtonHoverCard";
import _ from "lodash";
import Link from "next/link";

import { ArticleType } from "@/components/functionality/read/articleQueryAtom";

import { Button } from "../../ui/button";
import ArticleContextMenu from "../ArticleContextMenu";

type Props = {
  article: ArticleType;
  params: string;
};

export default function ArticleButton({ article, params }: Props) {
  return (
    <>
      <ArticleContextMenu article={article}>
        <ArticleButtonHoverCard
          title={article.title}
          description={article.description}
          category={article.category}
        >
          {params === article.url ? (
            <Button className="w-full justify-start" asChild>
              <Link href={`/${article.url}`}>
                {_.truncate(article.title, { length: 20 })}
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/${article.url}`}>
                {_.truncate(article.title, { length: 20 })}
              </Link>
            </Button>
          )}
        </ArticleButtonHoverCard>
      </ArticleContextMenu>
    </>
  );
}
