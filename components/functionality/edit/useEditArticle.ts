import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

import { useArticleSchema } from "@/components/form/useArticleSchema";

import useGetCurrentArticle from "../current-article/useGetCurrentArticle";
import { articlesQueryAtom } from "../read/articleQueryAtom";
import toUrl from "../toUrl";

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
  const currentArticle = useGetCurrentArticle();

  async function submit(value: ValueType) {
    const editedArticle = {
      category: value.category,
      content: value.content,
      description: value.description,
      title: value.title,
      url: toUrl(value.title),
      edited: serverTimestamp(),
    };

    const articleRef = doc(db, "articles", `${currentArticle.id}`);
    await updateDoc(articleRef, editedArticle);
    return value;
  }

  const router = useRouter();

  const { mutate, status } = useMutation({
    mutationKey: ["articles"],
    mutationFn: (value: ValueType) => submit(value),
    onMutate: async (editedArticle) => {
      await queryClient.cancelQueries({ queryKey: ["articles"] });
      const previousArticles = queryClient.getQueryData(["articles"]);
      // insert update document with new data here for optimistic update
      router.push(`/${toUrl(editedArticle.title)}`);
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
