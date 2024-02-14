import CategoryCommandItem from "./CategoryCommandItem";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import useGetCategories from "@/components/hooks/fetch/read/useGetCategories";

import CreateNewCategoryDialog from "@/components/form/add/fields/categoryfield/CreateNewCategoryDialog";
import { CommandGroup } from "@/components/ui/command";

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
