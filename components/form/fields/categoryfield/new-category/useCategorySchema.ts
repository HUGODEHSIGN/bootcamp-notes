import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useGetCategories from "@/components/functionality/read/useGetCategories";

export default function useCategorySchema() {
  const categories = useGetCategories();
  console.log(categories);
  const newCategorySchema = z.object({
    newCategory: z
      .string()
      .min(1, { message: "New Category is required" })
      .max(20, { message: "Category must be under 20 characters" })
      .refine((title) => !categories?.includes(title), {
        message: "Category already exists",
      }),
  });

  const form = useForm<z.infer<typeof newCategorySchema>>({
    resolver: zodResolver(newCategorySchema),
    mode: "onChange",
    defaultValues: {
      newCategory: "",
    },
  });

  return { newCategorySchema, form };
}
