import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/navigation";

import { db } from "@/lib/firestore-config";

import useFindNextArticle from "@/components/functionality/delete/useFindNextArticle";
import { ArticleType } from "@/components/functionality/read/articleQueryAtom";

// firebase deleteDoc function
async function deleteArticle(docId: string) {
  await deleteDoc(doc(db, "articles", docId));
  return docId;
}

export default function useDeleteArticle() {
  // gets the next article in the array to redirect user after delete
  const nextArticle = useFindNextArticle();
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteArticleMutation = useMutation({
    mutationKey: ["deleteArticles"],
    mutationFn: (docId: string) => deleteArticle(docId),

    // on mutate runs parallel to mutate function, used for optimistic update
    onMutate: async (deletedArticleId) => {
      // prevent fetching articles
      await queryClient.cancelQueries({ queryKey: ["articles"] });

      // previous data
      const previousArticles = queryClient.getQueryData(["articles"]);

      // delete article in cache
      queryClient.setQueryData(["articles"], (old: ArticleType[]) =>
        _.filter(old, { id: !deletedArticleId }),
      );

      // pushes to next article if user deletes from the article's screen, else remain on homescreen
      router.push(`/${nextArticle ? nextArticle.url : "#"}`);
      return { previousArticles };
    },

    // sets back to pre-mutation
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["articles"], context!.previousArticles);
    },

    // refetch once mutation finishes
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
  return deleteArticleMutation;
}
