"use client";

import { selectedArticleAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import _ from "lodash";
import { useEffect, useState } from "react";

import { articlesQueryAtom } from "../hooks/fetch/read/articleQueryAtom";

import Tag from "../all/Tag";
import Tiptap from "../form/add/fields/tiptap/toolbar/Tiptap";
import { CardDescription, CardTitle } from "../ui/card";

type Props = { articleParams: string };

// component
export default function Article({ articleParams }: Props) {
  const [{ data, isFetching }] = useAtom(articlesQueryAtom);
  const [articleContent, setArticleContent] = useState("");
  const [selectedArticle, setSelectedArticle] = useAtom(selectedArticleAtom);

  const [currentArticle] = _.filter(data, { id: articleParams });
  console.log(articleParams);

  function renderCategories() {
    return currentArticle.category.map((tag) => (
      <div key={tag}>
        <Tag category={tag} />
      </div>
    ));
  }

  useEffect(() => {
    setSelectedArticle(articleParams);
  }, [articleParams]);

  if (isFetching) {
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
