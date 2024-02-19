import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/firestore-config";

import { useArticleSchema } from "@/components/form/useArticleSchema";
import useGetCurrentArticle from "@/components/functionality/current-article/useGetCurrentArticle";
import toUrl from "@/components/functionality/toUrl";

type ValueType = {
  title: string;
  description: string;
  category: string[];
  content: string;
};

export function useEditArticle() {
  const queryClient = useQueryClient();
  const { formSchema } = useArticleSchema();

  const currentArticle = useGetCurrentArticle();

  async function submit(value: ValueType) {
    // change everything except created field
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

  const { mutate } = useMutation({
    mutationKey: ["articles"],
    mutationFn: (value: ValueType) => submit(value),
    onMutate: async (editedArticle) => {
      // cancel all fetch requests for articles
      await queryClient.cancelQueries({ queryKey: ["articles"] });

      // store previous article data in case of error
      const previousArticles = queryClient.getQueryData(["articles"]);
      // insert update document with new data here for optimistic update
      // redirect to new url
      router.push(`/${toUrl(editedArticle.title)}`);
      return { previousArticles };
    },
    onError: (_err, _newArticle, context) => {
      // sets query cache back to original in case of error
      queryClient.setQueryData(["articles"], context!.previousArticles);
    },
    onSettled: () => {
      //refetch
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
