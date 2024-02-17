"use client";

import { useAtom } from "jotai";
import _ from "lodash";
import { useState } from "react";

import useFindNextArticle from "@/components/functionality/delete/useFindNextArticle";

import Tiptap from "../../form/fields/tiptap/Tiptap";
import { articlesQueryAtom } from "../../functionality/read/articleQueryAtom";
import { CardDescription, CardTitle } from "../../ui/card";
import Tag from "../Tag";

type Props = { articleParams: string };

// component
export default function Article({ articleParams }: Props) {
  const [{ data, isFetching }] = useAtom(articlesQueryAtom);
  const [articleContent, setArticleContent] = useState("");

  const [currentArticle] = _.filter(data, { id: articleParams });
  const nextArticle = useFindNextArticle();

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
      <div>{nextArticle?.title}</div>
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
