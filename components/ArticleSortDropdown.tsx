"use client";

import { articleType } from "./ArticleGrid";
import { articlesAtom, sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

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
  const [articles, setArticles] = useAtom(articlesAtom);

  function sortByAlphabetical(a: articleType, b: articleType) {
    return a.title.localeCompare(b.title);
  }

  function sortByCreated(a: articleType, b: articleType) {
    return b.created.seconds - a.created.seconds;
  }

  function sortByEdited(a: articleType, b: articleType) {
    return b.edited.seconds - a.edited.seconds;
  }

  // function for sortingArticle - calling this function affects state directly and returns nothing
  function sortArticles(sortParameter: string) {
    let sortedArticles: articleType[];

    if (sortParameter == "alphabetical") {
      sortedArticles = [...articles].sort(sortByAlphabetical);
      setArticles(sortedArticles);
      console.log(sortedArticles);
    } else if (sortParameter == "created") {
      sortedArticles = [...articles].sort(sortByCreated);
      setArticles(sortedArticles);
      console.log(sortedArticles);
    } else if (sortParameter == "edited") {
      sortedArticles = [...articles].sort(sortByEdited);
      setArticles(sortedArticles);
      console.log(sortedArticles);
    } else {
      console.log("sortParameter does not exist");
    }
  }

  // render dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-40">
          {sort.charAt(0).toUpperCase() + sort.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Sort Articles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(e) => {
            setSort(e);
            sortArticles(e);
          }}
        >
          <DropdownMenuRadioItem value="alphabetical">
            Alphabetical
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="created">Created</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="edited">Edited</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
