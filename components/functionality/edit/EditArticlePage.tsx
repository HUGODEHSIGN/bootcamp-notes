"use client";

import { useAtom } from "jotai";
import _ from "lodash";

import ArticleForm from "@/components/form/ArticleForm";
import { articlesQueryAtom } from "@/components/functionality/read/articleQueryAtom";
import { ArticleType } from "@/components/view/home/ArticleCardGrid";

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
