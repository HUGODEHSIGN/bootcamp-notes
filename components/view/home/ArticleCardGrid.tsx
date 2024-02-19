"use client";

import { atom } from "jotai";

import useFilterSortArticles from "@/components/functionality/filter-sort/useFilterSortArticles";
import ArticleCard from "@/components/view/home/ArticleCard";

export const disableLinkAtom = atom(false);

export default function ArticleCardGrid() {
  const articles = useFilterSortArticles();

  // if no articles, don't show anything
  if (!articles) {
    return;
  }

  // maps through all the articles in the array
  function renderArticles() {
    return articles?.map((article) => (
      <div key={article.id}>
        <ArticleCard article={article} />
      </div>
    ));
  }

  return (
    <>
      <div className="grid grid-rows-1 gap-2">{renderArticles()}</div>
    </>
  );
}
