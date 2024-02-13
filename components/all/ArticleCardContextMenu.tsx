import { disableLinkAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { ArrowUpRightFromSquare, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import DeleteArticleDialog from "../DeleteArticleDialog";

type Props = {
  children: React.ReactNode;
  title: string;
  docId: string;
};

export default function ArticleCardContextMenu({
  children,
  title,
  docId,
}: Props) {
  const [linkIsDisabled, setLinkIsDisabled] = useAtom(disableLinkAtom);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
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
            <Link href={`./${title}`}>
              Open
              <ContextMenuShortcut>
                <ArrowUpRightFromSquare size={18} />
              </ContextMenuShortcut>
            </Link>
          </ContextMenuItem>
          <ContextMenuItem>
            Edit
            <ContextMenuShortcut>
              <Pencil size={18} />
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            className="text-destructive"
            onClick={() => {
              setDialogIsOpen(true);
            }}
          >
            Delete
            <ContextMenuShortcut>
              <Trash2 size={18} />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DeleteArticleDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        docId={docId}
      />
    </>
  );
}