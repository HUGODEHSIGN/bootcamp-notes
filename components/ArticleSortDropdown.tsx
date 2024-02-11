"use client";

import { articlesAtom } from "./ArticleGrid";
import { sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

import { useSortArticles } from "@/lib/hooks/useSortArticles";

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

// component for deciding how to sort all of the articles
export default function ArticleSortDropdown() {
  // state for which sorting method to use
  const [sort, setSort] = useAtom(sortAtom);

  // article state
  const [{ data, isPending, isError, refetch }] = useAtom(articlesAtom);

  // hook for sorting articles
  const { sortArticles } = useSortArticles();

  // render dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {sort.charAt(0).toUpperCase() + sort.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel>Sort Articles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(e) => {
            setSort(e);
            refetch();
          }}
        >
          <DropdownMenuRadioItem value="title">Title</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="created">Created</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="edited">Edited</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
