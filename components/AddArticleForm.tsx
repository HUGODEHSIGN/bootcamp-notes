"use client";

import { useSubmit } from "@/lib/hooks/useSubmit";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoriesAtom } from "../lib/atoms";
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
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

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
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [isNewCategory, setIsNewCategory] = useState<boolean>(false);

  const { submit } = useSubmit();

  function doesNotExist(value: string) {
    if (
      categories
        .map((category) => category.toLowerCase())
        .includes(value.toLowerCase())
    ) {
      return false;
    }
    return true;
  }

  const categoryDoesNotExist = z.string().refine(doesNotExist, {
    message: "Category already exists",
  });

  const categoryIsRightLength = z.string().min(2).max(10);

  const combinedSchema = z.intersection(
    categoryDoesNotExist,
    categoryIsRightLength
  );

  function changeCategorySchema() {
    let categorySchema:
      | z.ZodString
      | z.ZodIntersection<
          z.ZodEffects<z.ZodString, string, string>,
          z.ZodString
        >;
    if (!isNewCategory) {
      categorySchema = z.string({
        required_error: "Please select a category",
      });
    } else {
      categorySchema = combinedSchema;
    }
    return categorySchema;
  }

  // set schema for submitting each field
  const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(10).max(100),
    category: changeCategorySchema(),
    content: z.string().min(2).max(2000),
  });

  // set default values for each field
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  // function for submitting
  async function onSubmit(values: z.infer<typeof formSchema>) {
    submit(values);
    // close dialog after submission
    setState.setOpenDialog(false);
    setState.setOpenDrawer(false);
  }

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

                {!isNewCategory ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value
                            ? categories?.find(
                                (category) => category === field.value
                              )
                            : "Select category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search category" />
                        <CommandEmpty>Category not found</CommandEmpty>
                        <CommandGroup>
                          {categories?.map((category) => (
                            <CommandItem
                              value={category}
                              key={category}
                              onSelect={() => {
                                form.setValue("category", category);
                              }}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <FormControl>
                    {/* <Input placeholder="New category" {...field} /> */}
                    <Input
                      placeholder="New category"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is-new-category"
                    checked={isNewCategory}
                    onCheckedChange={() => setIsNewCategory(!isNewCategory)}
                  />
                  <Label htmlFor="is-new-category">Create new category</Label>
                </div>

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
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
