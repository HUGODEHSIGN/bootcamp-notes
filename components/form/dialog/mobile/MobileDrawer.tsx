import { Dispatch, SetStateAction } from "react";

import ArticleForm from "@/components/form/ArticleForm";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

import ArticleDialogTrigger from "../ArticleDialogTrigger";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileDrawer({ open, setOpen }: Props) {
  return (
    <Drawer open={true} onOpenChange={setOpen}>
      <ArticleDialogTrigger />

      <DrawerContent>
        {/* scroll area needs set height to work */}
        <ScrollArea className="h-[80vh]">
          <DrawerHeader className="text-left px-6">
            <DrawerTitle>Add a new article</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DrawerDescription>
          </DrawerHeader>

          {/* props allow form buttons to control state of overlay */}
          <ArticleForm className="px-6" setOpen={setOpen} />
          <DrawerFooter className="pt-2 px-6">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
