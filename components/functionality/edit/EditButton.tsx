"use client";

import { Ban, Pencil } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import useGetCurrentArticle from "@/components/functionality/current-article/useGetCurrentArticle";
import { Button } from "@/components/ui/button";

export default function EditButton() {
  const currentArticle = useGetCurrentArticle();
  const segment = useSelectedLayoutSegment();

  // only used when database is empty, don't show edit button when no entries are fetched
  if (!currentArticle) {
    return;
  }

  // show cancel button if in edit mode
  if (segment === "edit") {
    return (
      <Button size="icon" className="h-9 w-9" variant="secondary" asChild>
        <Link href={`/${currentArticle.url}`}>
          <Ban className="h-4 w-4" />
        </Link>
      </Button>
    );
  }

  return (
    <Button size="icon" className="h-9 w-9" asChild>
      <Link href={`/${currentArticle.url}/edit`}>
        <Pencil className="h-4 w-4" />
      </Link>
    </Button>
  );
}
