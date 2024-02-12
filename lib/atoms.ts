import { atom } from "jotai";

const categoryInitialValue: string[] = [];

export const sortAtom = atom("title");

export const filterAtom = atom("All");

export const disableLinkAtom = atom(false);

export const selectedArticleAtom = atom("");
