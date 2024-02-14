"use client";

import { filterAtom, sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { ArrowDownAZ, CalendarCheck, CalendarPlus } from "lucide-react";

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

import TooltipAll from "../../all/TooltipAll";

// component for deciding how to sort all of the articles
export default function ArticleSortDropdown() {
  // state for which sorting method to use
  const [filter, setFilter] = useAtom(filterAtom);
  const [sort, setSort] = useAtom(sortAtom);

  // render dropdown
  return (
    <DropdownMenu>
      <TooltipAll content="Sort By">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {sort.charAt(0).toUpperCase() + sort.slice(1)}
            {sort === "title" && <ArrowDownAZ className="ml-2 h-4 w-4" />}
            {sort === "newest" && <CalendarPlus className="ml-2 h-4 w-4" />}
            {sort === "edited" && <CalendarCheck className="ml-2 h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
      </TooltipAll>
      <DropdownMenuContent
        className="w-40"
        align="start"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
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
          onSelect={() => setSort("new")}
          checked={sort === "new"}
        >
          Newe
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
