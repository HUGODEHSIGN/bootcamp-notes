"use client";

import Tiptap from "./Tiptap";
import {
  filterAtom,
  isEditableAtom,
  selectedArticleAtom,
  sortAtom,
} from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

import useFetchArticles from "@/lib/hooks/useFetchArticles";
import useFetchCategories from "@/lib/hooks/useFetchCategories";

import Tag from "../all/Tag";
import { Button } from "../ui/button";
import { CardDescription, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { currentArticleAtom } from "../view/Article";

export type EditValueType = {
  //   title: string;
  //   description: string;
  //   category: string[];
  content: string;
  //   created: FieldValue;
};

type Props = {
  className?: string;
  articleParams: string;
};

let currentTitle: string;

// function for submitting new article

async function submit(value: EditValueType) {
  const articleRef = await addDoc(collection(db, "articles"), {
    // category: value.category,
    content: value.content,
    // description: value.description,
    // title: value.title,
    // created: value.created,
    // edited: serverTimestamp(),
  });
}

export default function EditArticleForm({ className, articleParams }: Props) {
  const [filter, setFilter] = useAtom(filterAtom);
  const [sort, setSort] = useAtom(sortAtom);

  const articles = useFetchArticles(filter, sort);
  const categories = useFetchCategories();

  const [{ data, isPending, isError, isSuccess, refetch }] =
    useAtom(currentArticleAtom);
  const [selectedArticle, setSelectedArticle] = useAtom(selectedArticleAtom);
  const [articleContent, setArticleContent] = useState("");
  const [isEditable, setIsEditable] = useAtom(isEditableAtom);

  const { mutate, status, variables } = useMutation({
    mutationKey: ["articles"],
    mutationFn: (value: EditValueType) => submit(value),
    onSuccess: async () => {
      console.log("test");
      articles.refetch();
      categories.refetch();
      setIsEditable(false);
    },
  });

  const formSchema = z.object({
    // title: z.string().min(2).max(50),
    // description: z.string().min(10).max(100),
    // category: z.array(z.string()),
    content: z.string(),
  });

  // set default values for each field
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      //   title: "",
      //   description: "",
      //   category: [],
      content: "",
    },
  });

  // function for submitting
  function onSubmit(value: z.infer<typeof formSchema>) {
    mutate(value);
  }

  useEffect(() => {
    currentTitle = decodeURIComponent(articleParams);
    setSelectedArticle(currentTitle);
    refetch();
  }, [articleParams]);

  function renderCategories() {
    return data?.category.map((tag) => (
      <div key={tag}>
        <Tag category={tag} />
      </div>
    ));
  }

  useEffect(() => {
    if (isSuccess) {
      setArticleContent(data.content);
      console.log(`data is ${data.content}`);
    }
  }, [isSuccess]);

  return (
    <div className={cn("grid items-start gap-4", className)}>
      <div className="flex flex-col gap-1">
        {/* <div className="text-4xl font-bold">{data?.title}</div>
        <div className="text-2xl font-medium">{data?.description}</div>
        <div className="flex flex-row gap-2">{renderCategories()}</div> */}

        <CardTitle>{data?.title}</CardTitle>
        <CardDescription>{data?.description}</CardDescription>
        <div className="flex flex-row gap-2">{renderCategories()}</div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* form field for content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  {data?.content && (
                    <Tiptap
                      content={data?.content}
                      onChange={field.onChange}
                      editable={true}
                    />
                  )}
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
