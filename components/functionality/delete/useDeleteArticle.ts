import useFindNextArticle from "./useFindNextArticle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/navigation";

import { db } from "@/lib/firestore-config";

import { ArticleType } from "@/components/view/home/ArticleCardGrid";

async function deleteArticle(docId: string) {
  await deleteDoc(doc(db, "articles", docId));
  return docId;
}

export default function useDeleteArticle() {
  const nextArticle = useFindNextArticle();
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteArticleMutation = useMutation({
    mutationKey: ["deleteArticles"],
    mutationFn: (docId: string) => deleteArticle(docId),
    onMutate: async (deletedArticleId) => {
      await queryClient.cancelQueries({ queryKey: ["articles"] });
      const previousArticles = queryClient.getQueryData(["articles"]);
      queryClient.setQueryData(["articles"], (old: ArticleType[]) =>
        _.filter(old, { id: !deletedArticleId }),
      );
      router.push(`/${nextArticle?.id}`);
      return { previousArticles };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["articles"], context!.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
  return deleteArticleMutation;
}
