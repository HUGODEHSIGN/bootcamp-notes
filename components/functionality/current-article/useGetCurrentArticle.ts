import { useAtom } from "jotai";
import _ from "lodash";
import { useParams } from "next/navigation";

import { ArticleType } from "@/components/view/home/ArticleCardGrid";

import { articlesQueryAtom } from "../read/articleQueryAtom";

export default function useGetCurrentArticle() {
  const [{ data, isFetching }] = useAtom(articlesQueryAtom);
  let params = useParams();

  function preventParamsArray() {
    if (Array.isArray(params.article)) {
      return (params.article = params.article[0]);
    }
    return params.article;
  }

  const articleId = preventParamsArray();

  const [currentArticle] = _.filter(data, {
    id: preventParamsArray(),
  }) as ArticleType[];

  return { articleId, currentArticle };
}
