"use client";

import { useAtom } from "jotai";

import useGetCurrentArticle from "@/components/functionality/current-article/useGetCurrentArticle";
import useFilterSortArticles from "@/components/functionality/filter-sort/useFilterSortArticles";
import { articlesQueryAtom } from "@/components/functionality/read/articleQueryAtom";
import ArticleButton from "@/components/view/article-page/ArticleButton";

export default function ArticleButtonList() {
  const articles = useFilterSortArticles();
  const [{ isFetching, isError }] = useAtom(articlesQueryAtom);
  const currentArticle = useGetCurrentArticle();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (!currentArticle) {
    return <div>No current Article</div>;
  }

  // render all of the article buttons
  function renderArticles() {
    return articles!.map((article) => (
      <div key={article.title}>
        {/* passes in articleId to detect if currently selected article matches the button for different style */}
        <ArticleButton article={article} params={currentArticle.url} />
      </div>
    ));
  }

  // render all of the article buttons
  return <div className="flex flex-col mt-2 mr-2">{renderArticles()}</div>;
}
