"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import TooltipAll from "@/components/all/TooltipAll";
import useGetCurrentArticle from "@/components/functionality/current-article/useGetCurrentArticle";
import DeleteArticleDialog from "@/components/functionality/delete/DeleteArticleDialog";
import { Button } from "@/components/ui/button";

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

      {/* usually would wrap button and use trigger, but when used with context menu, dismounts when context menu dismounts as well, so needs to sit outside */}
      <DeleteArticleDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={currentArticle.title}
        docId={currentArticle.id}
      />
    </>
  );
}
