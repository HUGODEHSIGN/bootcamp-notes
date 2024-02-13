import { atom } from "jotai";

export const sortAtom = atom("title");

export const filterAtom = atom("All");

export const disableLinkAtom = atom(false);

export const selectedArticleAtom = atom("");

export const isEditableAtom = atom(false);
