import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

import { useArticleSchema } from "../../form/useArticleSchema";
import { ArticleType } from "../read/articleQueryAtom";
import toUrl from "../toUrl";

// import useFetchCategories from "@/lib/hooks/useFetchCategories";

type ValueType = {
  title: string;
  description: string;
  category: string[];
  content: string;
};

// function that connects with firebase to add a new document
async function submit(value: ValueType) {
  const newArticle = {
    category: value.category,
    content: value.content,
    description: value.description,
    title: value.title,
    url: toUrl(value.title),
    created: serverTimestamp(),
    edited: serverTimestamp(),
  };
  const articleRef = await addDoc(collection(db, "articles"), newArticle);
  return newArticle;
}

export function useAddArticle(
  setOpen: Dispatch<SetStateAction<boolean>> | undefined,
) {
  const queryClient = useQueryClient();
  const { formSchema } = useArticleSchema();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["articles"],
    mutationFn: (value: ValueType) => submit(value),
    onMutate: async (newArticle) => {
      await queryClient.cancelQueries({ queryKey: ["articles"] });
      const previousArticles = queryClient.getQueryData(["articles"]);
      const newArticleWithUrl = {
        ...newArticle,
        url: toUrl(newArticle.title),
      };
      queryClient.setQueryData(["articles"], (old: ArticleType[]) => [
        ...old,
        newArticleWithUrl,
      ]);
      const newParameter = toUrl(newArticle.title);

      router.push(`/${newParameter}`);
      return { previousArticles };
    },
    onError: (_err, _newArticle, context) => {
      queryClient.setQueryData(["articles"], context!.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  // function for submitting
  function onAdd(value: z.infer<typeof formSchema>) {
    mutate(value);
    // close dialog after submission
    if (setOpen) {
      setOpen(false);
    }
  }
  return { onAdd };
}
