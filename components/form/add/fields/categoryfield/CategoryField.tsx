import CategoryPopover from "./popover/CategoryPopover";
import { UseFormReturn } from "react-hook-form";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
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

export default function CategoryField({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Category</FormLabel>

          <CategoryPopover field={field} form={form} />

          <FormDescription>
            Choose which category best fits the article or create a new category
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
