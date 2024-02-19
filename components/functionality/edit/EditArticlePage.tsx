"use client";

import { useAtom } from "jotai";
import _ from "lodash";

import ArticleForm from "@/components/form/ArticleForm";
import {
  ArticleType,
  articlesQueryAtom,
} from "@/components/functionality/read/articleQueryAtom";

type Props = {
  articleParams: string;
};

// didn't want to make page client component, so extracted into this component
export default function EditArticlePage({ articleParams }: Props) {
  const [{ data, isFetching }] = useAtom(articlesQueryAtom);

  // get current article
  const [currentArticle] = _.filter(data, {
    url: articleParams,
  }) as ArticleType[];

  if (isFetching) {
    return <div>loading...</div>;
  }
  return <ArticleForm previousValue={currentArticle} />;
}
