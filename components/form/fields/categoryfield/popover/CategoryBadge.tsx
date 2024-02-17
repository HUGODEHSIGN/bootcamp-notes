import { X } from "lucide-react";
import { MouseEvent } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { Badge } from "@/components/ui/badge";

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
  category: string;
};

export default function CategoryBadge({ field, form, category }: Props) {
  // handles removing the category on badge click
  function removeCategory(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) {
    // init a copy of the field value
    const selectedCategories = Array.isArray(field.value)
      ? // prevents error if field.value is empty
        [...field.value]
      : [];

    const index = selectedCategories.indexOf(category);
    selectedCategories.splice(index, 1);
    form.setValue("category", selectedCategories);

    // prevents button underneath from being clicked
    e.stopPropagation();
  }

  return (
    <Badge
      variant="secondary"
      onClick={(e) => removeCategory(e)}
      className="hover:bg-destructive hover:text-secondary"
    >
      <div className="flex flex-row gap-1 h-full items-center">
        <X size={12} />
        {category}
      </div>
    </Badge>
  );
}
