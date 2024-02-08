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
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
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
  const [isNewCategory, setIsNewCategory] = useState<boolean>(false);
  const [IsCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  // custom hook for submitting the form
  const { submit } = useSubmit();

  // custom filter for testing whether category exists when creating a new category
  function doesNotExist(value: string) {
    if (
      categories

        // to lower case to normalize the comparison
        .map((category) => category.toLowerCase())

        // testing whether the form data matches with categories already existing
        .includes(value.toLowerCase())
    ) {
      return false;
    }
    return true;
  }

  // new zod schema using filter doesNotExist
  const categoryDoesNotExist = z.string().refine(doesNotExist, {
    message: "Category already exists",
  });

  // validation for string length of category
  const categoryIsRightLength = z.string().min(2).max(10);

  // combine categoryDoesNotExist and categoryIsRightLength schema - both need to pass to submit form
  const combinedSchema = z.intersection(
    categoryDoesNotExist,
    categoryIsRightLength,
  );

  // there are two options for category, one to select an existing one and one to create a new category
  // this function switches between two schemas appropriate for either scenario
  function changeCategorySchema() {
    // initialize variable for switching between the two schemas
    let categorySchema:
      | z.ZodString
      | z.ZodIntersection<
          z.ZodEffects<z.ZodString, string, string>,
          z.ZodString
        >;

    // if it is not a new category, only need to require a selection
    if (!isNewCategory) {
      categorySchema = z.string({
        required_error: "Please select a category",
      });

      // if it is a new category, need to check if category exists already and if character is the right length
      // see combinedSchema above
    } else {
      categorySchema = combinedSchema;
    }
    return categorySchema;
  }

  // set schema for submitting each field
  const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(10).max(100),
    category: z.string().array(),
    content: z.string().min(2).max(2000),
  });

  // set default values for each field
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      // content: [''],
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

                {!isNewCategory ? (
                  <Popover
                    open={IsCategoryOpen}
                    onOpenChange={setIsCategoryOpen}
                  >
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
                          {field.value && (
                            <Separator
                              orientation="vertical"
                              className="mx-2"
                            />
                          )}
                          <div className="flex flex-row gap-2">
                            {field.value &&
                              field.value.map((category) => (
                                <Badge variant="secondary">{category}</Badge>
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
                                console.log(updatedCategories);
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

                          <CreateNewCategoryDialog></CreateNewCategoryDialog>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <FormControl>
                    <Input
                      placeholder="New category"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                )}

                {/* toggle for changing between selecting existing category or creating new category */}
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

          {/* submission button */}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
