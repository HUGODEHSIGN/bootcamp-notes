"use client";

import { filterAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import TooltipAll from "../../all/TooltipAll";
import useGetCategories from "../fetch/read/useGetCategories";

// component for deciding how to sort all of the articles
export default function ArticleFilterDropdown() {
  // state for which sorting method to use
  const [filter, setFilter] = useAtom(filterAtom);
  const categories = useGetCategories();

  // hook for filtering articles

  function renderDropdown() {
    return categories?.map((category) => (
      <DropdownMenuCheckboxItem
        key={category}
        onClick={() => setFilter(category)}
        checked={filter === category}
      >
        {category}
      </DropdownMenuCheckboxItem>
    ));
  }

  // render dropdown
  return (
    <DropdownMenu>
      <TooltipAll content="Filter By Tags">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {filter}
            <Filter className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </TooltipAll>
      <DropdownMenuContent
        className="w-40"
        align="start"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
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
