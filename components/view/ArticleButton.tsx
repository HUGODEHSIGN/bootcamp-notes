import ArticleButtonHoverCard from "./ArticleButtonHoverCard";
import { selectedArticleAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import Link from "next/link";

import ArticleCardContextMenu from "../home/ArticleCardContextMenu";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description: string;
  category: string[];
  docId: string;
};

export default function ArticleButton({
  title,
  description,
  category,
  docId,
}: Props) {
  const [selectedArticle, setSelectedArticle] = useAtom(selectedArticleAtom);

  return (
    <>
      <ArticleCardContextMenu title={title} docId={docId}>
        <ArticleButtonHoverCard description={description} category={category}>
          {selectedArticle === title ? (
            <Button className="w-full justify-start" asChild>
              <Link href={`./${title}`}>{title}</Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setSelectedArticle(title)}
              asChild
            >
              <Link href={`./${title}`}>{title}</Link>
            </Button>
          )}
        </ArticleButtonHoverCard>
      </ArticleCardContextMenu>
    </>
  );
}
