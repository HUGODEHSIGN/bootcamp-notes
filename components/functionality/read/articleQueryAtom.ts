import { collection, getDocs, query } from "firebase/firestore";
import { atomWithQuery } from "jotai-tanstack-query";

import { db } from "@/lib/firestore-config";

import { ArticleType } from "@/components/view/home/ArticleCardGrid";

async function fetchArticles() {
  // initialize variable for storing array of articles
  const articleData: ArticleType[] = [];

  const q = query(collection(db, "articles"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const newData: ArticleType = {
      id: doc.id,
      category: doc.data().category,
      content: doc.data().content,
      title: doc.data().title,
      description: doc.data().description,
      created: doc.data().created,
      edited: doc.data().edited,
    };
    articleData.push(newData);
  });

  return articleData;
}

export const articlesQueryAtom = atomWithQuery(() => ({
  queryKey: ["articles"],
  queryFn: () => fetchArticles(),
}));
