"use client";

import TooltipAll from "./TooltipAll";
import { filterAtom, sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Filter } from "lucide-react";
import { useEffect } from "react";

import useFetchArticles from "@/lib/hooks/useFetchArticles";
import useFetchCategories from "@/lib/hooks/useFetchCategories";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// component for deciding how to sort all of the articles
export default function ArticleFilterDropdown() {
  // state for which sorting method to use
  const [filter, setFilter] = useAtom(filterAtom);
  const [sort, setSort] = useAtom(sortAtom);
  const { data, isPending, isError, isSuccess, error, refetch } =
    useFetchCategories();
  // article state
  const articles = useFetchArticles(filter, sort);

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
    articles.refetch();
  }, [filter]);

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
