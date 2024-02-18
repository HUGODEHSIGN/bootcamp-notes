import { useAtom } from "jotai";
import _ from "lodash";

import {
  ArticleType,
  articlesQueryAtom,
} from "@/components/functionality/read/articleQueryAtom";

export default function useGetCategories() {
  // all of the fetched articles
  const [{ data }] = useAtom(articlesQueryAtom);

  if (!data) {
    return;
  }

  // filters out all unwanted information and returns all existing categories
  function getCategories(articles: ArticleType[]) {
    // init array to store categories
    let categories: string[] = [];
    articles.forEach((article) => {
      categories.push(...article.category);
      console.log(article.category);
    });
    // removes duplications in the array
    return (categories = _.uniq(categories));
  }

  return getCategories(data);
}
