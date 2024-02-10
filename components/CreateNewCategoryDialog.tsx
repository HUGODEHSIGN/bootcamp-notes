import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

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

type Props = {
  handleSubmit: (newCategory: string) => void;
};

export default function CreateNewCategoryDialog({ handleSubmit }: Props) {
  const [newCategory, setNewCategory] = useState<string>("");
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
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="category">Please type below</Label>
              <Input
                type="text"
                id="category"
                placeholder="Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleSubmit(newCategory)}>
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
