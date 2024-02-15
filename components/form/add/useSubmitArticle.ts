import { useArticleSchema } from "./useArticleSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

import { ArticleType } from "@/components/home/ArticleCardGrid";

// import useFetchCategories from "@/lib/hooks/useFetchCategories";

type ValueType = {
  title: string;
  description: string;
  category: string[];
  content: string;
};

async function submit(value: ValueType) {
  const articleRef = await addDoc(collection(db, "articles"), {
    category: value.category,
    content: value.content,
    description: value.description,
    title: value.title,
    created: serverTimestamp(),
    edited: serverTimestamp(),
  });
  return value;
}

export function useSubmitArticle(setState: {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { formSchema } = useArticleSchema();

  const { mutate, status } = useMutation({
    mutationKey: ["articles"],
    mutationFn: (value: ValueType) => submit(value),
    onMutate: async (newArticle) => {
      await queryClient.cancelQueries({ queryKey: ["articles"] });
      const previousArticles = queryClient.getQueryData(["articles"]);
      queryClient.setQueryData(["articles"], (old: ArticleType[]) => [
        ...old,
        newArticle,
      ]);
      router.push(`/${encodeURI(newArticle.title)}`);
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
  function onSubmit(value: z.infer<typeof formSchema>) {
    mutate(value);
    // close dialog after submission
    setState.setOpenDialog(false);
    setState.setOpenDrawer(false);
  }
  return { onSubmit };
}
