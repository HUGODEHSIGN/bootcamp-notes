import { disableLinkAtom } from "@/lib/atoms";
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
