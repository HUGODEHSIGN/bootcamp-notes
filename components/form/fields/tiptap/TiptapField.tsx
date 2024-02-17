import Tiptap from "./Tiptap";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArticleType } from "@/components/view/home/ArticleCardGrid";

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
  previousValue?: ArticleType;
};

export default function TiptapField({ form, previousValue }: Props) {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Tiptap
              // previousValue is used when editing, when creating a new article, previousValue is undefined
              content={previousValue?.content}
              onChange={field.onChange}
              editable={true}
            />
          </FormControl>
          <FormDescription>
            Type the content of the article here.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
