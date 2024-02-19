import { Dispatch, SetStateAction } from "react";

import ArticleForm from "@/components/form/ArticleForm";
import ArticleDialogTrigger from "@/components/form/dialog/ArticleDialogTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DesktopDialog({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ArticleDialogTrigger />
      <DialogContent className="min-w-[80vw] p-0 pt-12 pb-6">
        {/* scroll area needs set height to work */}
        <ScrollArea className="h-[80vh]">
          {/* margin here instead of padding in parent to prevent scroll bar and focus ring issues */}
          <div className="mx-6">
            <DialogHeader>
              <DialogTitle>Add a new article</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            {/* props allow form buttons to control state of overlay */}
            <ArticleForm setOpen={setOpen} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
