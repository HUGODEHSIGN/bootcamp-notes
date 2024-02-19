"use client";

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

import InputField from "@/components/form/fields/InputField";
import CategoryField from "@/components/form/fields/categoryfield/CategoryField";
import TiptapField from "@/components/form/fields/tiptap/TiptapField";
import { useArticleSchema } from "@/components/form/useArticleSchema";
import { useAddArticle } from "@/components/functionality/add/useAddArticle";
import { useEditArticle } from "@/components/functionality/edit/useEditArticle";
import { ArticleType } from "@/components/functionality/read/articleQueryAtom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type ArticleFormProps = {
  className?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
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
  setOpen,
  previousValue,
}: ArticleFormProps) {
  // adding necessary states to this component
  const { form } = useArticleSchema(previousValue);
  const { onAdd } = useAddArticle(setOpen);
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
