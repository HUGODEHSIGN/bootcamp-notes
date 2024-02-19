import Article from "@/components/view/article-page/Article";

export default function Page({ params }: { params: { article: string } }) {
  return (
    <main>
      <Article articleParams={params.article} />
    </main>
  );
}
