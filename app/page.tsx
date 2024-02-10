import ArticleFilterDropdown from "@/components/ArticleFilterDropdown";
import ArticleGrid from "@/components/ArticleGrid";
import ArticleSortDropdown from "@/components/ArticleSortDropdown";

export default function Page() {
  return (
    <main>
      <div className="flex flex-row gap-2">
        <ArticleSortDropdown />
        <ArticleFilterDropdown />
      </div>
      <ArticleGrid />
    </main>
  );
}
