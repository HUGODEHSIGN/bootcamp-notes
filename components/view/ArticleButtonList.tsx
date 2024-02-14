"use client";

import ArticleButton from "./ArticleButton";
import { useAtom } from "jotai";

import useFilterSortArticles from "../hooks/filter-sort/useFilterSortArticles";
import { articlesQueryAtom } from "@/components/hooks/fetch/read/articleQueryAtom";

import { Separator } from "../ui/separator";

export default function ArticleButtonList() {
  const articles = useFilterSortArticles();
  const [{ isSuccess }] = useAtom(articlesQueryAtom);

  // const init = useInit();

  // function for renderingArticles
  // function is called above in renderCategories
  function renderArticles() {
    // if statement for typescript saying articles could be undefined
    if (articles) {
      // filtering only the articles that has the same category as the category being rendered at the time

      // mapping through all of the filtered articles
      return articles.map((article) => (
        <div key={article.id}>
          <ArticleButton
            title={article.title}
            description={article.description}
            category={article.category}
            docId={article.id}
          />
        </div>
      ));
    }
  }

  // render all of the articles
  return (
    <>
      <div className="flex flex-row h-full mr-6">
        <div className="flex flex-col mt-2 mr-2">{renderArticles()}</div>
        {isSuccess && <Separator orientation="vertical" />}
      </div>

      {/* <div className="grid grid-rows-1 gap-2 p-6 pl-0">
        {isSuccess && renderArticles()}
        {isPending && <LoadingArticleCard />}
      </div> */}
    </>
  );
}
