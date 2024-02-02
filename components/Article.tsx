"use client";

import { db } from "@/lib/firestore-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { articleType } from "./ArticleGrid";

type Props = { articleParams: string };

export default function Article({ articleParams }: Props) {
  const [currentArticle, setCurrentArticle] = useState<articleType>();

  useEffect(() => {
    async function fetchArticle() {
      const q = query(
        collection(db, "articles"),
        where("title", "==", decodeURIComponent(articleParams))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCurrentArticle({
          id: doc.id,
          category: doc.data().category,
          content: doc.data().content,
          title: doc.data().title,
          description: doc.data().description,
          created: doc.data().timestamp,
          edited: doc.data().timestamp,
        });
      });
    }
    fetchArticle();
  }, [articleParams]);
  return (
    <div className="py-6">
      <div className="pb-6">
        <div className="text-4xl font-bold">{currentArticle?.title}</div>
        <div className="text-2xl font-medium">
          {currentArticle?.description}
        </div>
      </div>
      {currentArticle?.content && (
        <div dangerouslySetInnerHTML={{ __html: currentArticle?.content }} />
      )}
    </div>
  );
}
