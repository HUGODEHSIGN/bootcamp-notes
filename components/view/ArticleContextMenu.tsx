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

import DeleteArticleDialog from "../functionality/delete/DeleteArticleDialog";
import { ArticleType } from "../functionality/read/articleQueryAtom";

type Props = {
  children: React.ReactNode;
  article: ArticleType;
};

export default function ArticleContextMenu({ children, article }: Props) {
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
            <Link href={`/${article.url}`}>
              Open
              <ContextMenuShortcut>
                <ArrowUpRightFromSquare size={18} />
              </ContextMenuShortcut>
            </Link>
          </ContextMenuItem>
          {/* <ArticleDialog previousValue={article}> */}
          <ContextMenuItem asChild>
            <Link href={`/${article.url}/edit`}>
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
        title={article.title}
        docId={article.id}
      />
    </>
  );
}
