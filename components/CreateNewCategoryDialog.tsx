import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CreateNewCategoryDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full justify-start" asChild>
        <Button className="p-2 mt-1 h-fit">
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Category</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="category">
                Please type your new category name below
              </Label>
              <Input type="text" id="category" placeholder="Category" />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
