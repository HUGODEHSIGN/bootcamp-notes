"use client";

import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../app/firestore-config";
import { Separator } from "./ui/separator";

type articleType = {
  id: string;
  category: string;
  content: string;
  title: string;
  description: string;
};

export default function ArticleGrid() {
  const [categories, setCategories] = useState<Array<string>>();
  const [articles, setArticles] = useState<Array<articleType>>();

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
        };
        articleData.push(newData);
      });
      setArticles(articleData);
    }
    fetchArticles();
  }, []);

  function renderCategories() {
    if (categories) {
      return categories.map((category) => (
        <div key={category}>
          <Separator className="mt-2" />
          <div className="text-xl">{category}</div>
          <div className="flex flex-col gap-2 my-2">
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
    <div className="grid grid-cols-1 gap-2">
      <div>{renderCategories()}</div>
    </div>
  );
}
