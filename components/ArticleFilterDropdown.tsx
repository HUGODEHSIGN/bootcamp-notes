"use client";

import { filterAtom, filteredArticleAtom } from "@/lib/atoms";
import { collection, getDocs, query } from "firebase/firestore";
import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

import { db } from "@/lib/firestore-config";

import useFilterArticles from "@/lib/hooks/useFilterArticles";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function fetchCategories() {
  // initialize variable, sets it to state at the end of the function
  const categoriesData: string[] = [];
  const q = query(collection(db, "articles"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    // doc.data() is never undefined for query doc snapshots
    const newData = doc.data().category;
    categoriesData.push(newData);
  });

  return categoriesData;
}

export const categoriesAtom = atomWithQuery(() => ({
  queryKey: ["categories"],
  queryFn: () => fetchCategories(),
}));

// component for deciding how to sort all of the articles
export default function ArticleFilterDropdown() {
  // state for which sorting method to use
  const [filter, setFilter] = useAtom(filterAtom);

  // article state
  const [filteredArticles, setFilteredArticles] = useAtom(filteredArticleAtom);
  const [{ data, isPending, isError }] = useAtom(categoriesAtom);

  // hook for filtering articles
  const { filterArticles } = useFilterArticles();

  function renderDropdown() {
    return data?.map((category) => (
      <DropdownMenuRadioItem value={category} key={category}>
        {category}
      </DropdownMenuRadioItem>
    ));
  }

  // render dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{filter}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel>Sort Articles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={(e) => {
            setFilter(e);
          }}
        >
          <DropdownMenuRadioItem value="All" key="All">
            All
          </DropdownMenuRadioItem>
          {renderDropdown()}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
