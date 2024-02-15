import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useArticleSchema() {
  const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(10).max(100),
    category: z.array(z.string()),
    content: z.string(),
  });

  // set default values for each field
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      category: [],
      content: "",
    },
  });

  return { formSchema, form };
}
