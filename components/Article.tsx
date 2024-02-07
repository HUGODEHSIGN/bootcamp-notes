"use client";

import { articleType } from "./ArticleGrid";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/lib/firestore-config";

type Props = { articleParams: string };

// component
export default function Article({ articleParams }: Props) {
  // state for currentArticle
  const [currentArticle, setCurrentArticle] = useState<articleType>();

  // fetch current article
  useEffect(() => {
    async function fetchArticle() {
      const q = query(
        collection(db, "articles"),
        where("title", "==", decodeURIComponent(articleParams)),
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

  // render component
  return (
    // container for article
    <div className="py-6">
      {/* container for heading section */}
      {/* title and description */}
      <div className="pb-6">
        <div className="text-4xl font-bold">{currentArticle?.title}</div>
        <div className="text-2xl font-medium">
          {currentArticle?.description}
        </div>
      </div>

      {/* article content */}
      {currentArticle?.content && (
        <div dangerouslySetInnerHTML={{ __html: currentArticle?.content }} />
      )}
    </div>
  );
}
