import NewCategoryForm from "./NewCategoryForm";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
  const [open, setOpen] = useState(false);
  function handleAddCategory({ newCategory }: { newCategory: string }) {
    const selectedCategories = Array.isArray(field.value)
      ? // prevents error when field.value is empty
        [...field.value]
      : [];
    selectedCategories.push(newCategory);
    setOpen(false);
    form.setValue("category", selectedCategories);
  }

  return (
    <AlertDialog open={open}>
      {/* this is the button that shows up inside the combobox */}
      <AlertDialogTrigger className="w-full justify-start" asChild>
        <Button className="p-2 mt-1 h-fit" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Category</AlertDialogTitle>

          {/* <Label htmlFor="category">Please type below</Label>
              <Input
                type="text"
                id="category"
                placeholder="Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              /> */}
        </AlertDialogHeader>
        <NewCategoryForm
          handleAddCategory={handleAddCategory}
          setOpen={setOpen}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
