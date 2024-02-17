import { disableLinkAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { ArrowUpRightFromSquare, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import DeleteArticleDialog from "../DeleteArticleDialog";
import { ArticleType } from "../home/ArticleCardGrid";

type Props = {
  children: React.ReactNode;
  article: ArticleType;
};

export default function ArticleCardContextMenu({ children, article }: Props) {
  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const router = useRouter();

  if (!article) {
    return;
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent
          onMouseOver={() => setLinkIsDisabled(true)}
          onMouseOut={() => setLinkIsDisabled(false)}
          className="w-64"
        >
          <ContextMenuItem asChild>
            <Link href={`/${article.id}`}>
              Open
              <ContextMenuShortcut>
                <ArrowUpRightFromSquare size={18} />
              </ContextMenuShortcut>
            </Link>
          </ContextMenuItem>
          {/* <ArticleDialog previousValue={article}> */}
          <ContextMenuItem asChild>
            <Link href={`/${article.id}/edit`}>
              Edit
              <ContextMenuShortcut>
                <Pencil size={18} />
              </ContextMenuShortcut>
            </Link>
          </ContextMenuItem>
          {/* </ArticleDialog> */}
          <ContextMenuItem
            className="text-destructive"
            onClick={() => {
              setDialogIsOpen(true);
            }}
          >
            Delete
            <ContextMenuShortcut>
              <Trash2 size={18} className="text-destructive" />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DeleteArticleDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        docId={article.id}
      />
    </>
  );
}
