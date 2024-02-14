"use client";

import ArticleCard from "./ArticleCard";
import { useAtom } from "jotai";

import LoadingArticleCard from "../all/LoadingArticleCard";
import { articlesQueryAtom } from "../fetch/articleQueryAtom";
import useFilterSortArticles from "../fetch/useFilterSortArticles";

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

  console.log(articles);

  function renderArticles() {
    if (articles) {
      return articles.map((article) => (
        <div key={article.id}>
          <ArticleCard
            title={article.title}
            description={article.description}
            category={article.category}
            docId={article.id}
          />
        </div>
      ));
    }
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
