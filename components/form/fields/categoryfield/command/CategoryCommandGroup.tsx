import CategoryCommandItem from "./CategoryCommandItem";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import useGetCategories from "@/components/functionality/read/useGetCategories";
import { CommandGroup } from "@/components/ui/command";

import CreateNewCategoryDialog from "../new-category/CreateNewCategoryDialog";

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

export default function CategoryCommandGroup({ field, form }: Props) {
  // provides list of categories in an array
  const categories = useGetCategories();

  return (
    <CommandGroup>
      {categories?.map((category: string) => (
        <CategoryCommandItem
          field={field}
          form={form}
          category={category}
          key={category}
        />
      ))}

      {/* dialog for creating a new category */}
      <CreateNewCategoryDialog field={field} form={form} />
    </CommandGroup>
  );
}
