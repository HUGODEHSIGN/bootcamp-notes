"use client";

import InputField from "./fields/InputField";
import CategoryField from "./fields/categoryfield/CategoryField";
import TiptapField from "./fields/tiptap/TiptapField";
import { useArticleSchema } from "./useArticleSchema";
import { useSubmitArticle } from "./useSubmitArticle";
import { cn } from "@/lib/utils";

// import useFetchCategories from "@/lib/hooks/useFetchCategories";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";

type AddArticleFormProps = {
  className?: string;
  setState: {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export type ValueType = {
  title: string;
  description: string;
  category: string[];
  content: string;
};

// function for submitting new article

// form component
export default function AddArticleForm({
  className,
  setState,
}: AddArticleFormProps) {
  // adding necessary states to this component
  const { form } = useArticleSchema();
  const { onSubmit } = useSubmitArticle(setState);

  // render component
  return (
    <div className={cn("grid items-start gap-4", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* title */}
          <InputField
            form={form}
            name="title"
            label="Title"
            placeholder="Title"
            description="Name your article"
          />
          {/* description */}
          <InputField
            form={form}
            name="description"
            label="Description"
            placeholder="Description"
            description="Desribe the article briefly"
          />

          {/* form field for category */}
          <CategoryField form={form} />

          {/* form field for content */}
          <TiptapField form={form} />
          {/* submission button */}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
