"use client";

import ArticleCard from "./ArticleCard";
import { articlesAtom, categoriesAtom, filteredArticleAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

import useInit from "@/lib/hooks/useInit";

export type articleType = {
  id: string;
  category: string[];
  content: string;
  title: string;
  description: string;
  created: { seconds: number; nanoseconds: number };
  edited: { seconds: number; nanoseconds: number };
};

export default function ArticleGrid() {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [articles, setArticles] = useAtom(articlesAtom);
  const [filteredArticles, setFilteredArticles] = useAtom(filteredArticleAtom);

  const init = useInit();

  // function for renderingArticles
  // function is called above in renderCategories
  function renderArticles() {
    // if statement for typescript saying articles could be undefined
    if (filteredArticles) {
      // filtering only the articles that has the same category as the category being rendered at the time

      // mapping through all of the filtered articles
      return filteredArticles.map((article) => (
        <div key={article.id}>
          <ArticleCard
            title={article.title}
            description={article.description}
            category={article.category}
          />
        </div>
      ));
    }
  }

  // render all of the articles
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 pt-6">
        {renderArticles()}
      </div>
    </>
  );
}
