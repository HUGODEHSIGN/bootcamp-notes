"use client";

import InputField from "./fields/InputField";
import CategoryField from "./fields/categoryfield/CategoryField";
import TiptapField from "./fields/tiptap/TiptapField";
import { useAddArticle } from "./useAddArticle";
import { useArticleSchema } from "./useArticleSchema";
import { cn } from "@/lib/utils";

import { useEditArticle } from "../hooks/fetch/edit/useEditArticle";

// import useFetchCategories from "@/lib/hooks/useFetchCategories";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ArticleType } from "../home/ArticleCardGrid";

type ArticleFormProps = {
  className?: string;
  setState?: {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  };
  previousValue?: ArticleType;
};

export type ValueType = {
  title: string;
  description: string;
  category: string[];
  content: string;
};

// function for submitting new article

// form component
export default function ArticleForm({
  className,
  setState,
  previousValue,
}: ArticleFormProps) {
  // adding necessary states to this component
  const { form } = useArticleSchema(previousValue);
  const { onAdd } = useAddArticle(setState);
  const { onEdit } = useEditArticle();

  // render component
  return (
    <div className={cn("grid items-start gap-4", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(previousValue ? onEdit : onAdd)}
          className="space-y-8"
        >
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
          <TiptapField form={form} previousValue={previousValue} />
          {/* submission button */}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
