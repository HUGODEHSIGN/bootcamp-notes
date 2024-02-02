"use client";
import * as React from "react";

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
import { Plus } from "lucide-react";
import AddArticleForm from "./AddArticleForm";
import { ScrollArea } from "./ui/scroll-area";

export function AddArticleDialog() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <div className="hidden sm:block">
          <DialogTrigger asChild>
            <Button size="icon">
              <Plus />
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <ScrollArea className="h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add a new article</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <AddArticleForm setState={{ setOpenDialog, setOpenDrawer }} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <div className="block sm:hidden">
          <DrawerTrigger asChild>
            <Button size="icon">
              <Plus />
            </Button>
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <ScrollArea className="h-[66vh]">
            <DrawerHeader className="text-left">
              <DrawerTitle>Add a new article</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
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
