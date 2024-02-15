import CategoryPopoverTrigger from "./CategoryPopoverTrigger";
import { Popover } from "@radix-ui/react-popover";
import { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";

import CategoryCommandGroup from "../command/CategoryCommandGroup";

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

export default function CategoryPopover({ field, form }: Props) {
  const [IsCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <Popover open={IsCategoryOpen} onOpenChange={setIsCategoryOpen}>
      <CategoryPopoverTrigger field={field} form={form} />

      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          {/* search bar in combobox */}
          <CommandInput placeholder="Search category" />

          {/* if no search results */}
          <CommandEmpty>Tags Not Found</CommandEmpty>
          <CategoryCommandGroup field={field} form={form} />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
