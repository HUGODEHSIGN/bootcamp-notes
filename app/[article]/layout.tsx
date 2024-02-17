import { ChevronLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import ArticleFilterDropdown from "@/components/hooks/filter-sort/ArticleFilterDropdown";
import ArticleSortDropdown from "@/components/hooks/filter-sort/ArticleSortDropdown";

import TooltipAll from "@/components/all/TooltipAll";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ArticleButtonList from "@/components/view/ArticleButtonList";
import EditButton from "@/components/view/EditButton";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap justify-between">
        <div className="flex flex-row gap-2 mb-2">
          <TooltipAll content="Back">
            <Button size="icon" className="h-9 w-9" asChild>
              <Link href="/">
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipAll>
          <ArticleSortDropdown />
          <ArticleFilterDropdown />
        </div>

        <div className="flex flex-row gap-2 mb-2">
          <EditButton />

          <TooltipAll content="Delete">
            <Button variant="destructive" size="icon" className="h-9 w-9">
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipAll>
        </div>
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
