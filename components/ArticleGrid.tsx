"use client";

import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

import { articlesAtom, categoriesAtom } from "@/lib/atoms";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useAtom } from "jotai";
import { db } from "../lib/firestore-config";

export type articleType = {
  id: string;
  category: string;
  content: string;
  title: string;
  description: string;
  created: { seconds: number; nanoseconds: number };
  edited: { seconds: number; nanoseconds: number };
};

export default function ArticleGrid() {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [articles, setArticles] = useAtom(articlesAtom);
  const [sort, setSort] = useState(false);

  // fetch all of the data needed to display article cards
  useEffect(() => {
    // fetch categories
    const categoryRef = doc(db, "categories", "categories");
    async function fetchCategory() {
      const docSnap = await getDoc(categoryRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCategories(docSnap.data().categories);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchCategory();

    // fetch HTML articles
    const q = query(
      collection(db, "articles")
      //   where("category", "==", "HTML")
    );

    async function fetchArticles() {
      const articleData: articleType[] = [];
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
      setArticles(articleData);
      console.log(articles);
    }
    fetchArticles();
  }, [setArticles, setCategories]);

  function sortArticles() {}

  function renderCategories() {
    if (categories) {
      return categories.map((category) => (
        <div key={category}>
          <div className="text-md">{category}</div>
          <div className="flex flex-col gap-2 mt-2 mb-6">
            {renderArticles(category)}
          </div>
        </div>
      ));
    }
  }

  function renderArticles(category: string) {
    if (articles) {
      const filteredArticles = articles.filter(
        (article) => article.category === category
      );
      return filteredArticles.map((article) => (
        <div key={article.id}>
          <ArticleCard
            title={article.title}
            description={article.description}
          />
        </div>
      ));
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 pt-6">
        {renderCategories()}
      </div>
    </>
  );
}
