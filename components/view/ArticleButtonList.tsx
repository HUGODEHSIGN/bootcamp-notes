"use client";

import ArticleButton from "./ArticleButton";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";

import { articlesQueryAtom } from "../hooks/fetch/read/articleQueryAtom";
import useFilterSortArticles from "../hooks/filter-sort/useFilterSortArticles";

import { Separator } from "../ui/separator";

export default function ArticleButtonList() {
  const articles = useFilterSortArticles();
  const [{ isSuccess }] = useAtom(articlesQueryAtom);

  let params = useParams();

  if (!articles) {
    return <div>Loading...</div>;
  }

  function preventParamsArray() {
    if (Array.isArray(params.article)) {
      return (params.article = params.article[0]);
    }
    return params.article;
  }

  // function for renderingArticles
  // function is called above in renderCategories
  function renderArticles() {
    return articles!.map((article) => (
      <div key={article.title}>
        <ArticleButton article={article} params={preventParamsArray()} />
      </div>
    ));
  }

  // render all of the articles
  return (
    <>
      <div className="flex flex-row h-full mr-6">
        <div className="flex flex-col mt-2 mr-2">{renderArticles()}</div>
        {isSuccess && <Separator orientation="vertical" />}
      </div>
    </>
  );
}
