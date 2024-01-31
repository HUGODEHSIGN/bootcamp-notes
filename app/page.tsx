import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-12">
      <ArticleCard title="Title" description="Testing the description here" />
    </main>
  );
}
