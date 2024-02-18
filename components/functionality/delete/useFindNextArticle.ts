import _ from "lodash";

import useGetCurrentArticle from "@/components/functionality/current-article/useGetCurrentArticle";
import useFilterSortArticles from "@/components/functionality/filter-sort/useFilterSortArticles";

export default function useFindNextArticle() {
  const articles = useFilterSortArticles();
  const currentArticle = useGetCurrentArticle();

  if (!articles || !currentArticle) {
    return;
  }

  function findNextArticle() {
    // find index of current article
    const currentArticleIndex = _.findIndex(articles, {
      id: currentArticle.id,
    });

    // if is last entry, return first entry
    if (!articles?.[currentArticleIndex + 1]) {
      return articles![0];
    }
    return articles![currentArticleIndex + 1];
  }
  const nextArticle = findNextArticle();
  return nextArticle;
}
