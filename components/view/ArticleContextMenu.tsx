import { useAtom } from "jotai";
import { ArrowUpRightFromSquare, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import DeleteArticleDialog from "@/components/functionality/delete/DeleteArticleDialog";
import { ArticleType } from "@/components/functionality/read/articleQueryAtom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { disableLinkAtom } from "@/components/view/home/ArticleCardGrid";

type Props = {
  children: React.ReactNode;
  article: ArticleType;
};

export default function ArticleContextMenu({ children, article }: Props) {
  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent
          // disable links on homepage when hovering context menu
          onMouseOver={() => setLinkIsDisabled(true)}
          onMouseOut={() => setLinkIsDisabled(false)}
          className="w-64"
        >
          {/* open */}
          <ContextMenuItem asChild>
            <Link href={`/${article.url}`}>
              Open
              <ContextMenuShortcut>
                <ArrowUpRightFromSquare size={18} />
              </ContextMenuShortcut>
            </Link>
          </ContextMenuItem>

          {/* edit */}
          <ContextMenuItem asChild>
            <Link href={`/${article.url}/edit`}>
              Edit
              <ContextMenuShortcut>
                <Pencil size={18} />
              </ContextMenuShortcut>
            </Link>
          </ContextMenuItem>

          {/* delete */}
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

      {/* dialog usually wraps component, but in this case, dismounts when context menu dismounts, so sits outside here */}
      <DeleteArticleDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        title={article.title}
        docId={article.id}
      />
    </>
  );
}
