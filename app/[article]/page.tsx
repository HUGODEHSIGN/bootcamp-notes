import Article from "@/components/Article";

export default function Page({ params }: { params: { article: string } }) {
  return (
    <main>
      <Article articleParams={params.article} />
    </main>
  );
}
