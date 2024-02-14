import { Plus } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

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

import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";

type Props = {
  field: ControllerRenderProps<
    {
      title: string;
      description: string;
      category: string[];
      content: string;
    },
    "category"
  >;
  form: UseFormReturn<
    {
      title: string;
      description: string;
      category: string[];
      content: string;
    },
    any,
    undefined
  >;
};

export default function CreateNewCategoryDialog({ field, form }: Props) {
  const [newCategory, setNewCategory] = useState<string>("");

  function handleSubmit(newCategory: string) {
    const selectedCategories = Array.isArray(field.value)
      ? // prevents error when field.value is empty
        [...field.value]
      : [];
    selectedCategories.push(newCategory);
    form.setValue("category", selectedCategories);
  }

  return (
    <AlertDialog>
      {/* this is the button that shows up inside the combobox */}
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
