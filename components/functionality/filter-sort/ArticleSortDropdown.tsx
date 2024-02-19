"use client";

import { useAtom } from "jotai";
import { ArrowDownAZ, CalendarCheck, CalendarPlus } from "lucide-react";

import TooltipAll from "@/components/all/TooltipAll";
import { sortAtom } from "@/components/functionality/filter-sort/useFilterSortArticles";
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

// maps through this later to render
const dropdownItemList = [
  {
    label: "Title",
    state: "title",
    icon: <ArrowDownAZ className="mr-2 h-4 w-4" />,
  },
  {
    label: "New",
    state: "new",
    icon: <CalendarPlus className="mr-2 h-4 w-4" />,
  },
  {
    label: "Edited",
    state: "edited",
    icon: <CalendarCheck className="mr-2 h-4 w-4" />,
  },
];

// component for deciding how to sort all of the articles
export default function ArticleSortDropdown() {
  // state for which sorting method to use
  const [sort, setSort] = useAtom(sortAtom);

  // renders dropdown items
  function renderDropdownItems() {
    return dropdownItemList.map((item) => (
      <DropdownMenuCheckboxItem
        onSelect={() => setSort(item.state)}
        checked={sort === item.state}
        key={item.state}
      >
        {item.label}
        <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
      </DropdownMenuCheckboxItem>
    ));
  }

  // render dropdown
  return (
    <DropdownMenu>
      <TooltipAll content="Sort By">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {sort.charAt(0).toUpperCase() + sort.slice(1)}
            {sort === "title" && <ArrowDownAZ className="ml-2 h-4 w-4" />}
            {sort === "new" && <CalendarPlus className="ml-2 h-4 w-4" />}
            {sort === "edited" && <CalendarCheck className="ml-2 h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
      </TooltipAll>
      <DropdownMenuContent
        className="w-40"
        align="start"
        // prevents tooltip after close
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderDropdownItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
