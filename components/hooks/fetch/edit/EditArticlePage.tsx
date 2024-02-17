"use client";

import { useAtom } from "jotai";
import _ from "lodash";

import { articlesQueryAtom } from "@/components/hooks/fetch/read/articleQueryAtom";

import ArticleForm from "@/components/form/ArticleForm";
import { ArticleType } from "@/components/home/ArticleCardGrid";

type Props = {
  articleParams: string;
};

export default function EditArticlePage({ articleParams }: Props) {
  const [{ data, isFetching }] = useAtom(articlesQueryAtom);

  const [currentArticle] = _.filter(data, {
    id: articleParams,
  }) as ArticleType[];

  if (isFetching) {
    return <div>loading...</div>;
  }
  return <ArticleForm previousValue={currentArticle} />;
}
