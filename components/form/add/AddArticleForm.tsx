"use client";

import InputField from "./fields/InputField";
import CategoryField from "./fields/categoryfield/CategoryField";
import TiptapField from "./fields/tiptap/TiptapField";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

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

async function submit(value: ValueType) {
  const articleRef = await addDoc(collection(db, "articles"), {
    category: value.category,
    content: value.content,
    description: value.description,
    title: value.title,
    created: serverTimestamp(),
    edited: serverTimestamp(),
  });
}

// form component
export default function AddArticleForm({
  className,
  setState,
}: AddArticleFormProps) {
  // adding necessary states to this component

  const { mutate, status, variables } = useMutation({
    mutationKey: ["articles"],
    mutationFn: (value: ValueType) => submit(value),
    onSuccess: async () => {
      console.log("test");
    },
  });

  // there are two options for category, one to select an existing one and one to create a new category
  // this function switches between two schemas appropriate for either scenario

  // set schema for submitting each field
  const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(10).max(100),
    category: z.array(z.string()),
    content: z.string(),
  });

  // set default values for each field
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      category: [],
      content: "",
    },
  });

  // function for submitting
  function onSubmit(value: z.infer<typeof formSchema>) {
    mutate(value);
    // close dialog after submission
    setState.setOpenDialog(false);
    setState.setOpenDrawer(false);
  }

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
