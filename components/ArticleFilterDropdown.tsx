"use client";

import {
  articlesAtom,
  categoriesAtom,
  filterAtom,
  filteredArticleAtom,
  sortAtom,
} from "@/lib/atoms";
import { useAtom } from "jotai";

import useFilterArticles from "@/lib/hooks/useFilterArticles";
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
export default function ArticleFilterDropdown() {
  // state for which sorting method to use
  const [filter, setFilter] = useAtom(filterAtom);

  // article state
  const [articles, setArticles] = useAtom(articlesAtom);
  const [filteredArticles, setFilteredArticles] = useAtom(filteredArticleAtom);
  const [categories, setCategories] = useAtom(categoriesAtom);

  // hook for filtering articles
  const { filterArticles } = useFilterArticles();

  function renderDropdown() {
    return categories.map((category) => (
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
            let filteredArticles = filterArticles(e, articles);
            if (filteredArticles) {
              setFilteredArticles(filteredArticles);
            }
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
