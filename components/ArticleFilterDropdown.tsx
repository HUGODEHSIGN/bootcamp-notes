"use client";

import { articlesAtom } from "./ArticleGrid";
import { filterAtom } from "@/lib/atoms";
import { collection, getDocs, query } from "firebase/firestore";
import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import _ from "lodash";
import { Filter } from "lucide-react";
import { useEffect } from "react";

import { db } from "@/lib/firestore-config";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function fetchCategories() {
  // initialize variable, sets it to state at the end of the function
  let categoriesData: string[] = [];
  const q = query(collection(db, "articles"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    // doc.data() is never undefined for query doc snapshots
    const newData: string[] = doc.data().category;
    categoriesData.push(...newData);
  });
  categoriesData = _.uniq(categoriesData);

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
  const [article] = useAtom(articlesAtom);
  const [{ data, isPending, isError }] = useAtom(categoriesAtom);

  // hook for filtering articles

  function renderDropdown() {
    return data?.map((category) => (
      <DropdownMenuCheckboxItem
        key={category}
        onClick={() => setFilter(category)}
        checked={filter === category}
      >
        {category}
      </DropdownMenuCheckboxItem>
    ));
  }

  useEffect(() => {
    article.refetch();
  }, [filter]);

  // render dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {filter}
          <Filter className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          key="All"
          onClick={() => setFilter("All")}
          checked={filter === "All"}
        >
          All
        </DropdownMenuCheckboxItem>
        {renderDropdown()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
