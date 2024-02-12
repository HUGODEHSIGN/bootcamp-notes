"use client";

import ArticleCard from "./ArticleCard";
import { filterAtom, sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

import useFetchArticles from "@/lib/hooks/useFetchArticles";

import LoadingArticleCard from "../all/LoadingArticleCard";

export type articleType = {
  id: string;
  category: string[];
  content: string;
  title: string;
  description: string;
  created: { seconds: number; nanoseconds: number };
  edited: { seconds: number; nanoseconds: number };
};

let filterParameter: string = "Testing";
let sortParameter: string = "All";

// function for fetching articles

export default function ArticleCardGrid() {
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

  // render all of the articles
  return (
    <>
      <div className="grid grid-rows-1 gap-2">
        {isSuccess && renderArticles()}
        {isPending && <LoadingArticleCard />}
      </div>
    </>
  );
}
