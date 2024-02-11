import { atom } from "jotai";

const categoryInitialValue: string[] = [];

export const filteredArticleAtom = atom([
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

export const sortAtom = atom("alphabetical");

export const filterAtom = atom("Testing");
