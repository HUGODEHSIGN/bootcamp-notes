import { articleType } from "@/components/ArticleGrid";

export default function useFilterArticles() {
  function filterArticles(
    filterParameter: string,
    articles: articleType[] | undefined,
  ) {
    let filteredArticles: articleType[] | undefined = [];

    articles?.forEach((article) => {
      if (article.category.includes(filterParameter)) {
        filteredArticles?.push(article);
      }
    });

    if (filterParameter === "All") {
      filteredArticles = articles;
    }

    return filteredArticles;
  }
  return { filterArticles };
}
