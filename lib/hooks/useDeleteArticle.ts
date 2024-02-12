import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../firestore-config";

import { articleType } from "@/components/home/ArticleCardGrid";

export default function useDeleteArticle(
  docId: string,
  articlesRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<articleType[], Error>>,
  categoriesRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<string[], Error>>,
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
      categoriesRefetch();
    },
  });
  return { mutate, status };
}
