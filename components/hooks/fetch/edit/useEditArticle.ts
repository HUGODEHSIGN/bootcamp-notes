import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { useAtom } from "jotai";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

import { useArticleSchema } from "@/components/form/useArticleSchema";
import { ArticleType } from "@/components/home/ArticleCardGrid";

import { articlesQueryAtom } from "../read/articleQueryAtom";

type ValueType = {
  title: string;
  description: string;
  category: string[];
  content: string;
};

export function useEditArticle() {
  const queryClient = useQueryClient();
  const { formSchema } = useArticleSchema();

  const [{ data, isFetching }] = useAtom(articlesQueryAtom);
  let params = useParams();
  function preventParamsArray() {
    if (Array.isArray(params.article)) {
      return (params.article = params.article[0]);
    }
    return params.article;
  }

  const [currentArticle] = _.filter(data, {
    id: preventParamsArray(),
  }) as ArticleType[];

  async function submit(value: ValueType) {
    //   const articleRef = await addDoc(collection(db, "articles"), {
    //     category: value.category,
    //     content: value.content,
    //     description: value.description,
    //     title: value.title,
    //     created: serverTimestamp(),
    //     edited: serverTimestamp(),
    //   });

    const articleRef = doc(db, "articles", `${currentArticle.id}`);
    console.log(currentArticle.id);
    await updateDoc(articleRef, value);
    return value;
  }

  const router = useRouter();

  const { mutate, status } = useMutation({
    mutationKey: ["articles"],
    mutationFn: (value: ValueType) => submit(value),
    onMutate: async (newArticle) => {
      await queryClient.cancelQueries({ queryKey: ["articles"] });
      const previousArticles = queryClient.getQueryData(["articles"]);
      // insert update document with new data here for optimistic update
      router.push(`/${preventParamsArray()}`);
      return { previousArticles };
    },
    onError: (err, newArticle, context) => {
      queryClient.setQueryData(["articles"], context!.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  // function for submitting
  function onEdit(value: z.infer<typeof formSchema>) {
    mutate(value);
    // close dialog after submission
  }
  return { onEdit };
}
