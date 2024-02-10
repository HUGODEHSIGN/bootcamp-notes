"use client";

import ArticleCard from "./ArticleCard";
import { categoriesAtom, filteredArticleAtom } from "@/lib/atoms";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

import { db } from "@/lib/firestore-config";

export type articleType = {
  id: string;
  category: string[];
  content: string;
  title: string;
  description: string;
  created: { seconds: number; nanoseconds: number };
  edited: { seconds: number; nanoseconds: number };
};

// function for fetching articles
async function fetchArticles() {
  // initialize variable, sets it to state at the end of the function
  const articleData: articleType[] = [];
  const q = query(
    collection(db, "articles"),
    // where("category", "array-contains", `${"JavaScript"}`),
    orderBy("created", "desc"),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const newData: articleType = {
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

export const articlesAtom = atomWithQuery(() => ({
  queryKey: ["articles"],
  queryFn: () => fetchArticles(),
}));

export default function ArticleGrid() {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [{ data, isPending, isError }] = useAtom(articlesAtom);
  const [filteredArticles, setFilteredArticles] = useAtom(filteredArticleAtom);

  // const init = useInit();

  // function for renderingArticles
  // function is called above in renderCategories
  function renderArticles() {
    // if statement for typescript saying articles could be undefined
    if (data) {
      // filtering only the articles that has the same category as the category being rendered at the time

      // mapping through all of the filtered articles
      return data.map((article) => (
        <div key={article.id}>
          <ArticleCard
            title={article.title}
            description={article.description}
            category={article.category}
          />
        </div>
      ));
    }
  }

  // render all of the articles
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 pt-6">
        {renderArticles()}
      </div>
    </>
  );
}
