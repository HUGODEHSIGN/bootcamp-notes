import ArticleFilterDropdown from "@/components/hooks/filter-sort/ArticleFilterDropdown";
import ArticleSortDropdown from "@/components/hooks/filter-sort/ArticleSortDropdown";

import ArticleCardGrid from "@/components/home/ArticleCardGrid";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <ArticleSortDropdown />
          <ArticleFilterDropdown />
        </div>
        <Separator orientation="horizontal" />
        <ArticleCardGrid />
      </div>
    </main>
  );
}
