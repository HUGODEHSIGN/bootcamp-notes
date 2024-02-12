import { ChevronLeft, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import ArticleFilterDropdown from "@/components/all/ArticleFilterDropdown";
import ArticleSortDropdown from "@/components/all/ArticleSortDropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ArticleButtonList from "@/components/view/ArticleButtonList";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 mb-2">
          <Button size="icon" className="h-9 w-9" asChild>
            <Link href="/">
              <ChevronLeft />
            </Link>
          </Button>
          <ArticleSortDropdown />
          <ArticleFilterDropdown />
        </div>
        <div className="hidden sm:flex flex-row gap-2">
          <Button size="sm">
            Edit
            <Pencil className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="destructive" size="sm">
            Delete
            <Trash2 className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <Button size="icon" className="flex sm:hidden">
          <MoreHorizontal />
        </Button>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-row gap-2">
        <div className="hidden sm:block">
          <ArticleButtonList />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
