import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ArticleType } from "../home/ArticleCardGrid";

export function useArticleSchema(previousValue?: ArticleType) {
  const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(10).max(100),
    category: z.array(z.string()),
    content: z.string(),
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
