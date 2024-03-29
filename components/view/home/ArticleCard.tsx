import { useAtom } from "jotai";
import Link from "next/link";

import { ArticleType } from "@/components/functionality/read/articleQueryAtom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleContextMenu from "@/components/view/ArticleContextMenu";
import Tag from "@/components/view/Tag";
import { disableLinkAtom } from "@/components/view/home/ArticleCardGrid";

type Props = {
  article: ArticleType;
};

// component takes props from ArticleGrid
export default function ArticleCard({ article }: Props) {
  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);

  if (!article) {
    return;
  }

  function renderTags() {
    return article.category.map((tag) => (
      <div key={tag}>
        <Tag category={tag} />
      </div>
    ));
  }

  // render component
  return (
    // prevent link from working in certain cases where mouse click penetrates through the tree
    <Link href={linkIsDisabled ? "#" : `/${article.url}`}>
      <ArticleContextMenu article={article}>
        <Card className="hover:bg-secondary h-[145px]">
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>{article.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-row gap-2">{renderTags()}</div>
          </CardFooter>
        </Card>
      </ArticleContextMenu>
    </Link>
  );
}
