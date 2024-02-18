"use client";

import ArticleButton from "./ArticleButton";
import { useAtom } from "jotai";

import useGetCurrentArticle from "@/components/functionality/current-article/useGetCurrentArticle";

import useFilterSortArticles from "../../functionality/filter-sort/useFilterSortArticles";
import { articlesQueryAtom } from "../../functionality/read/articleQueryAtom";

export default function ArticleButtonList() {
  const articles = useFilterSortArticles();
  const [{ isSuccess, isFetching, isError }] = useAtom(articlesQueryAtom);
  const { articleId } = useGetCurrentArticle();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  // render all of the article buttons
  function renderArticles() {
    return articles!.map((article) => (
      <div key={article.title}>
        {/* passes in articleId to detect if currently selected article matches the button for different style */}
        <ArticleButton article={article} params={articleId} />
      </div>
    ));
  }

  // render all of the article buttons
  return <div className="flex flex-col mt-2 mr-2">{renderArticles()}</div>;
}
