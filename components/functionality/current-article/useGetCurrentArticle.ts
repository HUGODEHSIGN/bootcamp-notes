import { useAtom } from "jotai";
import _ from "lodash";
import { useParams } from "next/navigation";

import { ArticleType, articlesQueryAtom } from "../read/articleQueryAtom";

export default function useGetCurrentArticle() {
  const [{ data }] = useAtom(articlesQueryAtom);
  let params = useParams();

  function preventParamsArray() {
    if (Array.isArray(params.article)) {
      return (params.article = params.article[0]);
    }
    return params.article;
  }

  const [currentArticle] = _.filter(data, {
    url: preventParamsArray(),
  }) as ArticleType[];

  return currentArticle;
}
