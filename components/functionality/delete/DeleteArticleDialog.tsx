import { useAtom } from "jotai";

import useDeleteArticle from "@/components/functionality/delete/useDeleteArticle";
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
import { disableLinkAtom } from "@/components/view/home/ArticleCardGrid";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  docId: string;
};

export default function DeleteArticleDialog({
  isOpen,
  setIsOpen,
  title,
  docId,
}: Props) {
  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);
  const { mutate, isPending } = useDeleteArticle();

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
            <AlertDialogTitle>
              Are you sure you want to delete {title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/80"
              onClick={() => {
                mutate(docId);
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
