"use client";

import { db } from "@/lib/firestore-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { articleType } from "./ArticleGrid";

type Props = { articleParams: string };

export default function Article({ articleParams }: Props) {
  const [article, setArticle] = useState<articleType>();

  useEffect(() => {
    async function fetchArticle() {
      const q = query(
        collection(db, "articles"),
        where("title", "==", decodeURIComponent(articleParams))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setArticle({
          id: doc.id,
          category: doc.data().category,
          content: doc.data().content,
          title: doc.data().title,
          description: doc.data().description,
        });
      });
    }
    fetchArticle();
  }, []);
  return (
    <>
      <div className="py-6">
        <div className="text-4xl font-bold">{article?.title}</div>
        <div className="text-2xl font-medium">{article?.description}</div>
      </div>
      {article?.content && (
        <div dangerouslySetInnerHTML={{ __html: article?.content }} />
      )}
    </>
  );
}
