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

import AddArticleForm from "../form/AddArticleForm";
import { ScrollArea } from "../ui/scroll-area";

// component
export function AddArticleDialog() {
  // set dialog/drawer open state
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
          <TooltipAll content="Create a new article">
            <DialogTrigger asChild>
              <Button size="icon">
                <Plus />
              </Button>
            </DialogTrigger>
          </TooltipAll>
        </div>
        <DialogContent>
          {/* scroll area needs set height to work */}
          <ScrollArea className="h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add a new article</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            {/* props allow form buttons to control state of overlay */}
            <AddArticleForm setState={{ setOpenDialog, setOpenDrawer }} />
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
            <AddArticleForm
              className="px-4"
              setState={{ setOpenDialog, setOpenDrawer }}
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
