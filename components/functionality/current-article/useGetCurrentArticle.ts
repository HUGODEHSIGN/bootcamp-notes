import { useAtom } from "jotai";
import _ from "lodash";
import { useParams } from "next/navigation";

import {
  ArticleType,
  articlesQueryAtom,
} from "@/components/functionality/read/articleQueryAtom";

export default function useGetCurrentArticle() {
  const [{ data }] = useAtom(articlesQueryAtom);
  let params = useParams();

  // params has a chance to return as an array, returns first value if is array
  function preventParamsArray() {
    if (Array.isArray(params.article)) {
      return (params.article = params.article[0]);
    }
    return params.article;
  }

  // filter for the article that matches the url param
  const [currentArticle] = _.filter(data, {
    url: preventParamsArray(),
  }) as ArticleType[];

  return currentArticle;
}
