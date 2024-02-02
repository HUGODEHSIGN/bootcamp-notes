import ArticleGrid from "@/components/ArticleGrid";
import ArticleSortDropdown from "@/components/ArticleSortDropdown";

export default function Page() {
  return (
    <main>
      <ArticleSortDropdown />
      <ArticleGrid />
    </main>
  );
}
