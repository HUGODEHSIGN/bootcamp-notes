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

export default function TiptapField({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Tiptap content="" onChange={field.onChange} editable={true} />
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
