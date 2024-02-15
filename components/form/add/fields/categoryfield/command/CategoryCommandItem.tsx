import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { CommandItem } from "@/components/ui/command";

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

export default function CategoryCommandItem({ field, form, category }: Props) {
  // handles what happens when you click on an item in the combobox
  function handleSelect() {
    // init array of a copy of already selected categories
    const selectedCategories = Array.isArray(field.value)
      ? // prevents error if field.value is empty
        [...field.value]
      : [];

    if (selectedCategories.includes(category)) {
      // remove it from the selectedCategories
      const index = selectedCategories.indexOf(category);
      selectedCategories.splice(index, 1);
    } else {
      selectedCategories.push(category);
    }
    form.setValue("category", selectedCategories);
  }

  return (
    <CommandItem value={category} key={category} onSelect={handleSelect}>
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          field.value?.includes(category) ? "opacity-100" : "opacity-0",
        )}
      />
      {category}
    </CommandItem>
  );
}
