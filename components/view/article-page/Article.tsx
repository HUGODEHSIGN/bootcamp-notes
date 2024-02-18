"use client";

import { useAtom } from "jotai";
import { useState } from "react";

import Tiptap from "@/components/form/fields/tiptap/Tiptap";
import useGetCurrentArticle from "@/components/functionality/current-article/useGetCurrentArticle";
import { articlesQueryAtom } from "@/components/functionality/read/articleQueryAtom";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Tag from "@/components/view/Tag";

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

      {/* uses tiptap to render out html tags */}
      <Tiptap
        content={currentArticle.content}
        onChange={setArticleContent}
        editable={false}
      />
    </div>
  );
}
