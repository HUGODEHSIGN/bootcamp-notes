import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

import { useArticleSchema } from "@/components/form/useArticleSchema";
import { ArticleType } from "@/components/functionality/read/articleQueryAtom";
import toUrl from "@/components/functionality/toUrl";

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

    // this function is called before mutation occurs, and runs parallel to mutation
    onMutate: async (newArticle) => {
      // cancel all fetches
      await queryClient.cancelQueries({ queryKey: ["articles"] });

      // store previous state of query in case of error
      const previousArticles = queryClient.getQueryData(["articles"]);

      // sets articles query data to include new article for optimistic update
      queryClient.setQueryData(["articles"], (old: ArticleType[]) => [
        ...old,
        {
          ...newArticle,
          url: toUrl(newArticle.title),
        },
      ]);

      // redirect user to url of new article
      router.push(`/${toUrl(newArticle.title)}`);
      return { previousArticles };
    },
    onError: (_err, _newArticle, context) => {
      router.push(`/`);

      // resets articles data back to pre-mutation data
      queryClient.setQueryData(["articles"], context!.previousArticles);
    },
    onSettled: () => {
      // refetch
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
