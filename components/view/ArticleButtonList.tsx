"use client";

import ArticleButton from "./ArticleButton";
import { filterAtom, sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

import useFetchArticles from "@/lib/hooks/useFetchArticles";

import { Separator } from "../ui/separator";

export default function () {
  const [filter, setFilter] = useAtom(filterAtom);
  const [sort, setSort] = useAtom(sortAtom);
  const { data, isPending, isError, isSuccess, error, refetch } =
    useFetchArticles(filter, sort);

  // const init = useInit();

  // function for renderingArticles
  // function is called above in renderCategories
  function renderArticles() {
    // if statement for typescript saying articles could be undefined
    if (data) {
      // filtering only the articles that has the same category as the category being rendered at the time

      // mapping through all of the filtered articles
      return data.map((article) => (
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
