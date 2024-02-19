import { Plus } from "lucide-react";

import TooltipAll from "@/components/all/TooltipAll";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export default function ArticleDialogTrigger() {
  return (
    <TooltipAll content="Add a new article">
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
    </TooltipAll>
  );
}
