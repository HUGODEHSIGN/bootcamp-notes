import _ from "lodash";

import useGetCurrentArticle from "../current-article/useGetCurrentArticle";
import useFilterSortArticles from "../filter-sort/useFilterSortArticles";

export default function useFindNextArticle() {
  const articles = useFilterSortArticles();
  const { articleId } = useGetCurrentArticle();

  if (!articles) {
    return;
  }

  function findNextArticle() {
    const currentArticleIndex = _.findIndex(articles, { id: articleId });
    if (!articles?.[currentArticleIndex + 1]) {
      return articles![0];
    }
    return articles![currentArticleIndex + 1];
  }
  const nextArticle = findNextArticle();
  return nextArticle;
}
