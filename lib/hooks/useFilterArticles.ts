import { useAtom } from "jotai";

import { articleType } from "@/components/ArticleGrid";

import { articlesAtom } from "../atoms";

export default function useFilterArticles() {
  function filterArticles(filterParameter: string, articles: articleType[]) {
    let filteredArticles: articleType[] = [];

    articles.forEach((article) => {
      if (article.category.includes(filterParameter)) {
        filteredArticles.push(article);
      }
    });

    if (filterParameter === "All") {
      filteredArticles = articles;
    }

    return filteredArticles;
  }
  return { filterArticles };
}
