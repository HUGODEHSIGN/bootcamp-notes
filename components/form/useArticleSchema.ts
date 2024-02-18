import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  ArticleType,
  articlesQueryAtom,
} from "../functionality/read/articleQueryAtom";
import toUrl from "../functionality/toUrl";

export function useArticleSchema(previousValue?: ArticleType) {
  const [{ data }] = useAtom(articlesQueryAtom);

  function getAllTitles() {
    if (!data) {
      return;
    }

    if (previousValue) {
      return _.pull(
        data.map((article) => toUrl(article.title)),
        previousValue.url,
      );
    }
    return data?.map((article) => toUrl(article.title));
  }

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(150, { message: "Title must be under 150 characters" })
      .refine(
        (title) =>
          !getAllTitles()?.includes(
            title.replace(/\s+/g, "-").replace(/[^\w\s]/gi, ""),
          ),
        {
          message: "Title already exists",
        },
      ),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(500, { message: "Description must be under 500 characters" }),
    category: z.string().array(),
    content: z
      .string()
      .min(1, { message: "Content is required" })
      .max(1000000, { message: "How did you even reach this limit..." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: previousValue ? previousValue.title : "",
      description: previousValue ? previousValue.description : "",
      category: previousValue ? previousValue.category : [],
      content: previousValue ? previousValue.content : "",
    },
  });

  return { formSchema, form };
}
