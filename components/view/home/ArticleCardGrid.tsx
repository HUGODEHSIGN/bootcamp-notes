"use client";

import ArticleCard from "./ArticleCard";
import LoadingArticleCard from "./LoadingArticleCard";
import { useAtom } from "jotai";

import { articlesQueryAtom } from "@/components/functionality/read/articleQueryAtom";

import useFilterSortArticles from "../../functionality/filter-sort/useFilterSortArticles";

export type ArticleType = {
  id: string;
  category: string[];
  content: string;
  title: string;
  description: string;
  created: { seconds: number; nanoseconds: number };
  edited: { seconds: number; nanoseconds: number };
};

export default function ArticleCardGrid() {
  const articles = useFilterSortArticles();
  const [{ isSuccess, isPending }] = useAtom(articlesQueryAtom);

  if (!articles) {
    return;
  }

  function renderArticles() {
    return articles?.map((article) => (
      <div key={article.id}>
        <ArticleCard article={article} />
      </div>
    ));
  }

  return (
    <>
      <div className="grid grid-rows-1 gap-2">
        {isSuccess && renderArticles()}
        {isPending && <LoadingArticleCard />}
      </div>
    </>
  );
}
