import ArticleCard from "@/components/ArticleCard";
import ArticleGrid from "@/components/ArticleGrid";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-6 sm:mx-12 md:mx-24 lg:mx-48">
      <ArticleGrid />
      <div className="w-24 h-24 bg-slate-100 sm:bg-slate-200 md:bg-slate-300 lg:bg-slate-300 xl:bg-slate-400 2xl:bg-slate-500"></div>
    </main>
  );
}
