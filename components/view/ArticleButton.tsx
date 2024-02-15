import ArticleButtonHoverCard from "./ArticleButtonHoverCard";
import { selectedArticleAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import Link from "next/link";

import ArticleCardContextMenu from "../all/ArticleCardContextMenu";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description: string;
  category: string[];
  docId: string;
  params: string;
};

export default function ArticleButton({
  title,
  description,
  category,
  docId,
  params,
}: Props) {
  const [selectedArticle, setSelectedArticle] = useAtom(selectedArticleAtom);

  return (
    <>
      <ArticleCardContextMenu title={title} docId={docId}>
        <ArticleButtonHoverCard description={description} category={category}>
          {selectedArticle === title ? (
            <Button className="w-full justify-start" asChild>
              <Link href={`./${docId}`}>{title}</Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setSelectedArticle(title)}
              asChild
            >
              <Link href={`./${docId}`}>{title}</Link>
            </Button>
          )}
        </ArticleButtonHoverCard>
      </ArticleCardContextMenu>
    </>
  );
}
