import ArticleFilterDropdown from "@/components/functionality/filter-sort/ArticleFilterDropdown";
import ArticleSortDropdown from "@/components/functionality/filter-sort/ArticleSortDropdown";
import { Separator } from "@/components/ui/separator";
import ArticleCardGrid from "@/components/view/home/ArticleCardGrid";

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
