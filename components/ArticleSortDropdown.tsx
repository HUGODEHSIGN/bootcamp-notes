"use client";

import { articlesAtom } from "./ArticleGrid";
import { sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { ArrowDownAZ, CalendarCheck, CalendarPlus } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// component for deciding how to sort all of the articles
export default function ArticleSortDropdown() {
  // state for which sorting method to use
  const [sort, setSort] = useAtom(sortAtom);

  // article state
  const [{ data, isPending, isError, refetch }] = useAtom(articlesAtom);

  useEffect(() => {
    refetch();
  }, [sort]);

  // render dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {sort.charAt(0).toUpperCase() + sort.slice(1)}
          {sort === "title" && <ArrowDownAZ className="ml-2 h-4 w-4" />}
          {sort === "created" && <CalendarPlus className="ml-2 h-4 w-4" />}
          {sort === "edited" && <CalendarCheck className="ml-2 h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          onSelect={() => setSort("title")}
          checked={sort === "title"}
        >
          Title
          <DropdownMenuShortcut>
            <ArrowDownAZ className="mr-2 h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onSelect={() => setSort("created")}
          checked={sort === "created"}
        >
          Created
          <DropdownMenuShortcut>
            <CalendarPlus className="mr-2 h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onSelect={() => setSort("edited")}
          checked={sort === "edited"}
        >
          Edited
          <DropdownMenuShortcut>
            <CalendarCheck className="mr-2 h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
