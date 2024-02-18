"use client";

import { useAtom } from "jotai";
import { Ban, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

import { Button } from "../../ui/button";
import useGetCurrentArticle from "../current-article/useGetCurrentArticle";
import { articlesQueryAtom } from "../read/articleQueryAtom";

export default function EditButton() {
  const [{ data, isFetching }] = useAtom(articlesQueryAtom);
  const currentArticle = useGetCurrentArticle();
  let params = useParams();
  const segment = useSelectedLayoutSegment();

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
