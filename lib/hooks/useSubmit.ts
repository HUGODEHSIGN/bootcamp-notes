import { useSortArticles } from "./useSortArticles";
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

import { db } from "../firestore-config";

import { articlesAtom, categoriesAtom, sortAtom } from "../atoms";

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
  const [sort, setSort] = useAtom(sortAtom);

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

    let newArticles = [
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
    ];

    const { sortArticles } = useSortArticles(newArticles);

    let sortedArticles = sortArticles(sort);

    if (sortedArticles) {
      setArticles(sortedArticles);
    }
  }

  return { submit };
}
