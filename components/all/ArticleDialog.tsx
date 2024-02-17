"use client";

import TooltipAll from "./TooltipAll";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import ArticleForm from "../form/ArticleForm";
import { ArticleType } from "../home/ArticleCardGrid";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  children: React.ReactNode;
  previousValue?: ArticleType;
};

// component
export function ArticleDialog({ children, previousValue }: Props) {
  // setting states separately to allow different media queries
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // render component
  return (
    <>
      {/* dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* css mediaquery to hide on smaller devices */}
        <div className="hidden sm:block">
          <TooltipAll
            content={
              previousValue
                ? `Edit ${previousValue.title}`
                : "Add a new article"
            }
          >
            <DialogTrigger asChild>{children}</DialogTrigger>
          </TooltipAll>
        </div>

        <DialogContent className="min-w-[80vw]">
          {/* scroll area needs set height to work */}
          <ScrollArea className="h-[80vh]">
            <DialogHeader>
              <DialogTitle>
                {previousValue
                  ? `Edit ${previousValue.title}`
                  : "Add a new article"}
              </DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            {/* props allow form buttons to control state of overlay */}
            <ArticleForm
              setState={{ setOpenDialog, setOpenDrawer }}
              previousValue={previousValue}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        {/* css mediaquery to hide on larger devices */}
        <div className="block sm:hidden">
          <DrawerTrigger asChild>
            <Button size="icon">
              <Plus />
            </Button>
          </DrawerTrigger>
        </div>
        <DrawerContent>
          {/* scroll area needs set height to work */}
          <ScrollArea className="h-[66vh]">
            <DrawerHeader className="text-left">
              <DrawerTitle>Add a new article</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>

            {/* props allow form buttons to control state of overlay */}
            <ArticleForm
              className="px-4"
              setState={{ setOpenDialog, setOpenDrawer }}
              previousValue={previousValue}
            />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
}
