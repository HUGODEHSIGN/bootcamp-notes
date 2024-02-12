import ArticleFilterDropdown from "@/components/all/ArticleFilterDropdown";
import ArticleSortDropdown from "@/components/all/ArticleSortDropdown";
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
