import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { AtomWithQueryResult } from "jotai-tanstack-query";

import { db } from "../firestore-config";

import { articleType } from "@/components/ArticleGrid";

export default function useDeleteArticle(
  docId: string,
  articlesRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<articleType[], Error>>,
  categories: AtomWithQueryResult<string[], Error>,
) {
  async function deleteArticle() {
    await deleteDoc(doc(db, "articles", docId));
    console.log(docId);
  }

  const { mutate, status } = useMutation({
    mutationKey: ["deleteArticles"],
    mutationFn: () => deleteArticle(),
    onSuccess: async () => {
      articlesRefetch();
      categories.refetch();
    },
  });
  return { mutate, status };
}
