import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@/lib/firestore-config";

export default function useDeleteArticle(docId: string) {
  async function deleteArticle() {
    await deleteDoc(doc(db, "articles", docId));
    console.log(docId);
  }

  const { mutate, status } = useMutation({
    mutationKey: ["deleteArticles"],
    mutationFn: () => deleteArticle(),
  });
  return { mutate, status };
}
