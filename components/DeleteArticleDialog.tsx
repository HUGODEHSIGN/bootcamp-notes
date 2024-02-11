import { disableLinkAtom, filterAtom, sortAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useState } from "react";

import useDeleteArticle from "@/lib/hooks/useDeleteArticle";
import useFetchArticles from "@/lib/hooks/useFetchArticles";
import useFetchCategories from "@/lib/hooks/useFetchCategories";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  docId: string;
};

export default function DeleteArticleDialog({
  isOpen,
  setIsOpen,
  docId,
}: Props) {
  const [newCategory, setNewCategory] = useState<string>("");
  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);
  const [filter, setFilter] = useAtom(filterAtom);
  const [sort, setSort] = useAtom(sortAtom);
  const article = useFetchArticles(filter, sort);
  const categories = useFetchCategories();
  const { mutate, status } = useDeleteArticle(
    docId,
    article.refetch,
    categories.refetch,
  );

  return (
    <AlertDialog open={isOpen}>
      <div
        // className="w-screen h-screen"
        onMouseOver={() => setLinkIsDisabled(true)}
        onMouseOut={() => setLinkIsDisabled(false)}
        onClick={() => setIsOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                console.log("submit");
                mutate();
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
}
