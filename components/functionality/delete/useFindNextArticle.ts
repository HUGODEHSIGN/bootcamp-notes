import _ from "lodash";

import useGetCurrentArticle from "../current-article/useGetCurrentArticle";
import useFilterSortArticles from "../filter-sort/useFilterSortArticles";

export default function useFindNextArticle() {
  const articles = useFilterSortArticles();
  const currentArticle = useGetCurrentArticle();

  if (!articles || !currentArticle) {
    return;
  }

  function findNextArticle() {
    const currentArticleIndex = _.findIndex(articles, {
      id: currentArticle.id,
    });
    if (!articles?.[currentArticleIndex + 1]) {
      return articles![0];
    }
    return articles![currentArticleIndex + 1];
  }
  const nextArticle = findNextArticle();
  return nextArticle;
}
