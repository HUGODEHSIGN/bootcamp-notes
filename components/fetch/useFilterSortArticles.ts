import { articlesQueryAtom } from "./articleQueryAtom";
import { filterAtom, sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

import { ArticleType } from "../home/ArticleCardGrid";

export default function useFilterSortArticles() {
  // state for filter and sort parameters
  const [filter, setFilter] = useAtom(filterAtom);
  const [sort, setSort] = useAtom(sortAtom);

  // all of the fetched articles
  const [{ data }] = useAtom(articlesQueryAtom);

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
    if (sort === "created") {
      sortedArticles.sort((a, b) => a.created.seconds - b.created.seconds);
    }
    if (sort === "edited") {
      sortedArticles.sort((a, b) => a.created.seconds - b.created.seconds);
    }
    return sortedArticles;
  }

  if (!data) {
    return;
  }

  return sortArticles(filterArticles(data));
}
