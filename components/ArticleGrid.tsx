"use client";

import ArticleCard from "./ArticleCard";
import { articlesAtom, categoriesAtom } from "@/lib/atoms";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useAtom } from "jotai";
import { useEffect } from "react";

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
      collection(db, "articles"),
      //   where("category", "==", "HTML")
    );

    // fetch articles
    async function fetchArticles() {
      // initialize variable, sets it to state at the end of the function
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

  // first render all of the categories
  function renderCategories() {
    if (categories) {
      return categories.map((category) => (
        <div key={category}>
          <div className="text-md">{category}</div>
          <div className="flex flex-col gap-2 mt-2 mb-6">
            {/* render all of the articles with the same category as the one currently being rendered here */}
            {renderArticles(category)}
          </div>
        </div>
      ));
    }
  }

  // function for renderingArticles
  // function is called above in renderCategories
  function renderArticles(category: string) {
    // if statement for typescript saying articles could be undefined
    if (articles) {
      // filtering only the articles that has the same category as the category being rendered at the time
      const filteredArticles = articles.filter(
        (article) => article.category === category,
      );

      // mapping through all of the filtered articles
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

  // render all of the articles
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 pt-6">
        {renderCategories()}
      </div>
    </>
  );
}
