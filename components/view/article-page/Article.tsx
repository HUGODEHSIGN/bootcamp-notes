"use client";

import { useAtom } from "jotai";
import { useState } from "react";

import useGetCurrentArticle from "@/components/functionality/current-article/useGetCurrentArticle";

import Tiptap from "../../form/fields/tiptap/Tiptap";
import { articlesQueryAtom } from "../../functionality/read/articleQueryAtom";
import { CardDescription, CardTitle } from "../../ui/card";
import Tag from "../Tag";

type Props = { articleParams: string };

// component
export default function Article({ articleParams }: Props) {
  const [{ data, isFetching }] = useAtom(articlesQueryAtom);
  const [articleContent, setArticleContent] = useState("");

  const currentArticle = useGetCurrentArticle();

  function renderCategories() {
    return currentArticle.category.map((tag) => (
      <div key={tag}>
        <Tag category={tag} />
      </div>
    ));
  }

  if (!currentArticle) {
    return;
  }

  // render component
  return (
    // container for article
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <CardTitle>{currentArticle.title}</CardTitle>
        <CardDescription>{currentArticle.description}</CardDescription>
        <div className="flex flex-row gap-2">{renderCategories()}</div>
      </div>

      <Tiptap
        content={currentArticle.content}
        onChange={setArticleContent}
        editable={false}
      />
    </div>
  );
}
