"use client";

import { useAtom } from "jotai";
import _ from "lodash";
import { Ban, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

import { Button } from "../../ui/button";
import { ArticleType } from "../../view/home/ArticleCardGrid";
import { articlesQueryAtom } from "../read/articleQueryAtom";

export default function EditButton() {
  const [{ data, isFetching }] = useAtom(articlesQueryAtom);

  let params = useParams();
  const segment = useSelectedLayoutSegment();

  function preventParamsArray() {
    if (Array.isArray(params.article)) {
      return (params.article = params.article[0]);
    }
    return params.article;
  }

  let [currentArticle] = _.filter(data, {
    id: preventParamsArray(),
  }) as ArticleType[];

  if (!currentArticle) {
    return;
  }

  if (segment === "edit") {
    return (
      <Button size="icon" className="h-9 w-9" variant="secondary" asChild>
        <Link href={`/${params.article}`}>
          <Ban className="h-4 w-4" />
        </Link>
      </Button>
    );
  }

  return (
    <Button size="icon" className="h-9 w-9" asChild>
      <Link href={`/${params.article}/edit`}>
        <Pencil className="h-4 w-4" />
      </Link>
    </Button>
  );
}
