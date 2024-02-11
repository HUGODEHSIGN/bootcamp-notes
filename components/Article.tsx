"use client";

import { articleType } from "./ArticleGrid";
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

  useLayoutEffect(() => {
    currentTitle = decodeURIComponent(articleParams);
    console.log(articleParams);
    refetch();
  }, [articleParams]);

  // render component
  return (
    // container for article
    <div className="py-6">
      {/* container for heading section */}
      {/* title and description */}
      <div className="pb-6">
        <div className="text-4xl font-bold">{data?.title}</div>
        <div className="text-2xl font-medium">{data?.description}</div>
      </div>

      {/* article content */}
      {data?.content && (
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
      )}
    </div>
  );
}
