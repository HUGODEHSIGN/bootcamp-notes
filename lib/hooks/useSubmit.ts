import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAtom } from "jotai";
import { useState } from "react";
import { articlesAtom, categoriesAtom } from "../atoms";
import { db } from "../firestore-config";
import { useSortArticles } from "./useSortArticles";

type ValueType = {
  title: string;
  description: string;
  category: string;
  content: string;
};

export function useSubmit() {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [isNewCategory, setIsNewCategory] = useState<boolean>(false);

  const [articles, setArticles] = useAtom(articlesAtom);

  const { sortArticles } = useSortArticles();

  const categoriesRef = doc(db, "categories", "categories");

  async function submit(values: ValueType) {
    await updateDoc(categoriesRef, {
      categories: arrayUnion(values.category),
    });

    // fix duplication later
    setCategories([...categories, values.category]);

    const articleRef = await addDoc(collection(db, "articles"), {
      category: values.category,
      content: values.content,
      description: values.description,
      title: values.title,
      created: serverTimestamp(),
      edited: serverTimestamp(),
    });

    setArticles([
      ...articles,
      {
        id: values.title,
        category: values.category,
        content: values.content,
        description: values.description,
        title: values.title,
        created: Timestamp.now(),
        edited: Timestamp.now(),
      },
    ]);
    // sortArticles("alphabetical");
  }

  return { submit };
}
