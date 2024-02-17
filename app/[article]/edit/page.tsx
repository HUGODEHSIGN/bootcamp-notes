"use client";

import EditArticlePage from "@/components/functionality/edit/EditArticlePage";

export default function page({ params }: { params: { article: string } }) {
  return (
    <div className="mt-6">
      <EditArticlePage articleParams={params.article} />
    </div>
  );
}
