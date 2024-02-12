"use client";

import { selectedArticleAtom } from "@/lib/atoms";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { useLayoutEffect } from "react";

import { db } from "@/lib/firestore-config";

import Tag from "../all/Tag";
import { articleType } from "../home/ArticleCardGrid";
import { CardDescription, CardTitle } from "../ui/card";

type Props = { articleParams: string };

let currentTitle: string;

async function fetchCurrentArticle() {
  let currentArticle: articleType = {
    id: "",
    category: [],
    content: "",
    title: "",
    description: "",
    created: Timestamp.now(),
    edited: Timestamp.now(),
  };
  const q = query(
    collection(db, "articles"),
    where("title", "==", currentTitle),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    currentArticle = {
      id: doc.id,
      category: doc.data().category,
      content: doc.data().content,
      title: doc.data().title,
      description: doc.data().description,
      created: doc.data().timestamp,
      edited: doc.data().timestamp,
    };
  });
  return currentArticle;
}

export const currentArticleAtom = atomWithQuery(() => ({
  queryKey: ["currentArticle"],
  queryFn: () => fetchCurrentArticle(),
}));

// component
export default function Article({ articleParams }: Props) {
  const [{ data, isPending, isError, isSuccess, refetch }] =
    useAtom(currentArticleAtom);
  const [selectedArticle, setSelectedArticle] = useAtom(selectedArticleAtom);

  useLayoutEffect(() => {
    currentTitle = decodeURIComponent(articleParams);
    setSelectedArticle(currentTitle);
    refetch();
  }, [articleParams]);

  function renderCategories() {
    return data?.category.map((tag) => (
      <div key={tag}>
        <Tag category={tag}></Tag>
      </div>
    ));
  }

  // render component
  return (
    // container for article
    <div className="mt-6 flex flex-col gap-6">
      {/* container for heading section */}
      {/* title and description */}

      <div className="flex flex-col gap-1">
        {/* <div className="text-4xl font-bold">{data?.title}</div>
        <div className="text-2xl font-medium">{data?.description}</div>
        <div className="flex flex-row gap-2">{renderCategories()}</div> */}

        <CardTitle>{data?.title}</CardTitle>
        <CardDescription>{data?.description}</CardDescription>
        <div className="flex flex-row gap-2">{renderCategories()}</div>
      </div>

      {/* article content */}
      {data?.content && (
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
      )}
    </div>
  );
}
