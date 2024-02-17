import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

import { ArticleType } from "@/components/view/home/ArticleCardGrid";

import { useArticleSchema } from "../../form/useArticleSchema";

// import useFetchCategories from "@/lib/hooks/useFetchCategories";

type ValueType = {
  id: string;
  title: string;
  description: string;
  category: string[];
  content: string;
};

// function that connects with firebase to add a new document
async function submit(value: ValueType) {
  const articleRef = doc(db, "articles", `${value.id}`);
  const newArticle = {
    category: value.category,
    content: value.content,
    description: value.description,
    title: value.title,
    created: serverTimestamp(),
    edited: serverTimestamp(),
  };
  setDoc(articleRef, newArticle);
  return value;
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
      queryClient.setQueryData(["articles"], (old: ArticleType[]) => [
        ...old,
        newArticle,
      ]);
      router.push(`/${newArticle?.id}`);
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
    const docId = {
      id: value.title.replace(/\s+/g, "-").replace(/[^\w\s]/gi, ""),
    };
    const docValue = { ...docId, ...value };

    mutate(docValue);
    // close dialog after submission
    if (setOpen) {
      setOpen(false);
    }
  }
  return { onAdd };
}
