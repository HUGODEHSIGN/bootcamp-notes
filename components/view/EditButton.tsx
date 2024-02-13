"use client";

import { isEditableAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Pencil } from "lucide-react";

import TooltipAll from "../all/TooltipAll";
import { Button } from "../ui/button";

export default function EditButton() {
  const [isEditable, setIsEditable] = useAtom(isEditableAtom);
  return (
    <TooltipAll content="Edit">
      <Button
        size="icon"
        className="h-9 w-9"
        onClick={() => setIsEditable(!isEditable)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </TooltipAll>
  );
}
