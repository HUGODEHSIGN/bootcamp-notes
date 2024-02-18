import useCategorySchema from "./useCategorySchema";
import { Dispatch, SetStateAction } from "react";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  handleAddCategory({ newCategory }: { newCategory: string }): void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export default function NewCategoryForm({ handleAddCategory, setOpen }: Props) {
  const { form } = useCategorySchema();
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="newCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Category</FormLabel>
              <FormControl>
                <Input placeholder="New Category" {...field} />
              </FormControl>
              <FormDescription>
                Add a non-existing category to the article
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            // call handleSubmit here to prevent calling submit in outer (ArticleForm) form
            onClick={form.handleSubmit(handleAddCategory)}
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
