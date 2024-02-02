export default function Article({ params }: { params: { article: string } }) {
  return (
    <main className="mx-6 sm:mx-12 md:mx-24 lg:mx-48">
      <div className="text-2xl">{decodeURIComponent(params.article)}</div>
    </main>
  );
}
