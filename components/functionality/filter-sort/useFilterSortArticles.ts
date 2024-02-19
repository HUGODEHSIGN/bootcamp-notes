import { atom, useAtom } from "jotai";

import {
  ArticleType,
  articlesQueryAtom,
} from "@/components/functionality/read/articleQueryAtom";

export const sortAtom = atom("title");

export const filterAtom = atom("All");

export default function useFilterSortArticles() {
  // state for filter and sort parameters
  const [filter, setFilter] = useAtom(filterAtom);
  const [sort, setSort] = useAtom(sortAtom);

  // all of the fetched articles
  const [{ data }] = useAtom(articlesQueryAtom);

  if (!data) {
    return;
  }

  // filter articles
  function filterArticles(articles: ArticleType[]) {
    // init array to store filtered articles
    const filteredArticles: ArticleType[] = [];
    articles.forEach((article) => {
      // special case for All
      if (filter === "All") {
        filteredArticles.push(article);
      }

      // push if category exists in article
      if (article.category.includes(filter)) {
        filteredArticles.push(article);
      }
    });
    return filteredArticles;
  }

  // sort articles
  function sortArticles(articles: ArticleType[]) {
    // duplicate original articles to prevent unwanted mutations
    const sortedArticles = articles;
    if (sort === "title") {
      sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
    }
    // calculating nanoseconds would cause more computing power, not necessary
    if (sort === "new") {
      sortedArticles.sort((a, b) => b.created.seconds - a.created.seconds);
    }
    if (sort === "edited") {
      sortedArticles.sort((a, b) => b.created.seconds - a.created.seconds);
    }
    return sortedArticles;
  }

  return sortArticles(filterArticles(data));
}
