import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import CategoryBadge from "@/components/form/fields/categoryfield/popover/CategoryBadge";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

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

export default function CategoryPopoverTrigger({ field, form }: Props) {
  return (
    <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant="outline"
          role="combobox"
          className={cn("w-fit", !field.value && "text-muted-foreground")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tags
          {/* hides the separator if no categories have been selected yet */}
          {field.value.length !== 0 && (
            <Separator orientation="vertical" className="mx-2" />
          )}
          <div className="flex flex-row gap-2">
            {/* maps out already selected categories inside of the button as badges */}
            {field.value.map((category) => (
              <CategoryBadge
                field={field}
                form={form}
                category={category}
                key={category}
              />
            ))}
          </div>
        </Button>
      </FormControl>
    </PopoverTrigger>
  );
}
