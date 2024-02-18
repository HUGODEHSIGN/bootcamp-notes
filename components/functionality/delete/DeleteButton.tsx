"use client";

import DeleteArticleDialog from "./DeleteArticleDialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import TooltipAll from "@/components/all/TooltipAll";
import { Button } from "@/components/ui/button";

import useGetCurrentArticle from "../current-article/useGetCurrentArticle";

export default function DeleteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const currentArticle = useGetCurrentArticle();

  if (!currentArticle) {
    return;
  }

  return (
    <>
      <TooltipAll content="Delete">
        <Button
          variant="destructive"
          size="icon"
          className="h-9 w-9"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TooltipAll>
      <DeleteArticleDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={currentArticle.title}
        docId={currentArticle.id}
      />
    </>
  );
}
