import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { db } from "../firestore-config";

import { articleType } from "@/components/ArticleGrid";

import { articlesAtom, categoriesAtom } from "../atoms";

export default function useInit() {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [articles, setArticles] = useAtom(articlesAtom);
  useEffect(() => {
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
  }, []);

  return;
}
