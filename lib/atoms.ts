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

export const sortAtom = atom("title");

export const filterAtom = atom("All");

export const disableLinkAtom = atom(false);
