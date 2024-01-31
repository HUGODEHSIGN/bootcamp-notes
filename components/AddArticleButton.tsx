import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function AddArticleButton() {
  return (
    <Button size="icon">
      <Plus />
    </Button>
  );
}
