import _ from "lodash";
import Link from "next/link";

import { ArticleType } from "@/components/functionality/read/articleQueryAtom";
import { Button } from "@/components/ui/button";
import ArticleContextMenu from "@/components/view/ArticleContextMenu";
import ArticleButtonHoverCard from "@/components/view/article-page/ArticleButtonHoverCard";

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
          {/* if button is same as currently viewing article, show in black, otherwise show with light bg */}
          {params === article.url ? (
            <Button className="w-full justify-start" asChild>
              <Link href={`/${article.url}`}>
                {/* prevents article title from taking up too much space */}
                {_.truncate(article.title, { length: 20 })}
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/${article.url}`}>
                {/* prevents article title from taking up too much space */}
                {_.truncate(article.title, { length: 20 })}
              </Link>
            </Button>
          )}
        </ArticleButtonHoverCard>
      </ArticleContextMenu>
    </>
  );
}
