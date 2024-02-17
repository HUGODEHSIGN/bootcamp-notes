import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ArticleType } from "../view/home/ArticleCardGrid";

export function useArticleSchema(previousValue?: ArticleType) {
  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(150, { message: "Title must be under 150 characters" }),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(500, { message: "Description must be under 500 characters" }),
    category: z.array(z.string()).nonempty({ message: "Category is required" }),
    content: z
      .string()
      .min(1, { message: "Content is required" })
      .max(1000000, { message: "How did you even reach this limit..." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: previousValue ? previousValue.title : "",
      description: previousValue ? previousValue.description : "",
      category: previousValue ? previousValue.category : [],
      content: previousValue ? previousValue.content : "",
    },
  });

  return { formSchema, form };
}
