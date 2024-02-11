"use client";

import ArticleCard from "./ArticleCard";
import LoadingArticleCard from "./LoadingArticleCard";
import { Skeleton } from "./ui/skeleton";
import { filterAtom } from "@/lib/atoms";
import { QueryClient } from "@tanstack/query-core";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAtom } from "jotai";
import { atomWithQuery, queryClientAtom } from "jotai-tanstack-query";
import { useEffect } from "react";

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

let filterParameter: string = "Testing";

function filtering(f: string, s: string) {
  let q;
  if (f === "All") {
    q = query(collection(db, "articles"), orderBy(`${"title"}`, "desc"));
  } else {
    q = query(
      collection(db, "articles"),
      where("category", "array-contains", f),
      orderBy(`${"title"}`, "desc"),
    );
  }
  return q;
}

// function for fetching articles
async function fetchArticles() {
  // initialize variable, sets it to state at the end of the function
  const articleData: articleType[] = [];
  const q = filtering(filterParameter, "lol");

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
  enabled: true,
}));

export default function ArticleGrid() {
  const [{ data, isPending, isError, isSuccess, error, refetch }] =
    useAtom(articlesAtom);
  const [filter, setFilter] = useAtom(filterAtom);

  useEffect(() => {
    filterParameter = filter;
    refetch();
  }, [filter]);

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
        {isSuccess && renderArticles()}
        {isPending && <LoadingArticleCard />}
      </div>
      {isPending.toString()}
      {isError.toString()}
      {error?.toString()}
    </>
  );
}
