"use client";

import CreateNewCategoryDialog from "./CreateNewCategoryDialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSubmit } from "@/lib/hooks/useSubmit";

import { categoriesAtom } from "../lib/atoms";

type AddArticleFormProps = {
  className?: string;
  setState: {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

// form component
export default function AddArticleForm({
  className,
  setState,
}: AddArticleFormProps) {
  // adding necessary states to this component
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [IsCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  // custom hook for submitting the form
  const { submit } = useSubmit();

  // there are two options for category, one to select an existing one and one to create a new category
  // this function switches between two schemas appropriate for either scenario

  // set schema for submitting each field
  const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(10).max(100),
    category: z.array(z.string()),
    content: z.string().min(2).max(2000),
  });

  // set default values for each field
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: [],
    },
  });

  // function for submitting
  function onSubmit(values: z.infer<typeof formSchema>) {
    submit(values);
    // close dialog after submission
    setState.setOpenDialog(false);
    setState.setOpenDrawer(false);
  }

  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    [],
  );

  // render component
  return (
    <div className={cn("grid items-start gap-4", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* form field for title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Name your article here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* form field for description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>Describe the article briefly</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* form field for category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>

                <Popover open={IsCategoryOpen} onOpenChange={setIsCategoryOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-fit",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {/* {field.value
                            ? categories?.find(
                                (category) => category === field.value,
                              ) */}
                        {/* : "Select category"} */}
                        <Plus className="mr-2 h-4 w-4" />
                        Tags
                        {field.value.length !== 0 && (
                          <Separator orientation="vertical" className="mx-2" />
                        )}
                        <div className="flex flex-row gap-2">
                          {field.value &&
                            field.value.map((category) => (
                              <Badge
                                variant="secondary"
                                key={category}
                                onClick={() => {
                                  const selectedCategories = Array.isArray(
                                    field.value,
                                  )
                                    ? [...field.value]
                                    : [];

                                  let updatedCategories: string[] = [];
                                  const index =
                                    selectedCategories.indexOf(category);
                                  console.log(index);
                                  updatedCategories = [...selectedCategories];
                                  updatedCategories.splice(index, 1);
                                  form.setValue("category", updatedCategories);
                                }}
                                className="hover:bg-primary hover:text-secondary"
                              >
                                {category}
                              </Badge>
                            ))}
                        </div>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search category" />
                      <CommandEmpty>Category not found</CommandEmpty>
                      <CommandGroup>
                        {categories?.map((category) => (
                          <CommandItem
                            value={category}
                            key={category}
                            onSelect={() => {
                              const selectedCategories = Array.isArray(
                                field.value,
                              )
                                ? [...field.value]
                                : [];
                              let updatedCategories: string[] = [];
                              if (selectedCategories.includes(category)) {
                                const index =
                                  selectedCategories.indexOf(category);
                                console.log(index);
                                updatedCategories = [...selectedCategories];
                                updatedCategories.splice(index, 1);
                              } else {
                                updatedCategories = [
                                  ...selectedCategories,
                                  category,
                                ];
                              }
                              form.setValue("category", updatedCategories);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(category)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category}
                          </CommandItem>
                        ))}

                        <CreateNewCategoryDialog
                          handleSubmit={(newCategory: string) => {
                            const selectedCategories = Array.isArray(
                              field.value,
                            )
                              ? [...field.value]
                              : [];
                            let updatedCategories: string[] = [
                              ...selectedCategories,
                              newCategory,
                            ];
                            form.setValue("category", updatedCategories);
                          }}
                        />
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormDescription>
                  Choose which category best fits the article or create a new
                  category
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* form field for content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type here..."
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Type the content of the article here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* submission button */}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
