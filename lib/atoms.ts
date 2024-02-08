import { atom } from "jotai";

const categoryInitialValue: string[] = [];
export const articlesAtom = atom([
  {
    id: "",
    category: categoryInitialValue,
    content: "",
    title: "",
    description: "",
    created: { seconds: 0, nanoseconds: 0 },
    edited: { seconds: 0, nanoseconds: 0 },
  },
]);

export const categoriesAtom = atom([""]);

export const sortAtom = atom("alphabetical");
