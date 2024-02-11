import DeleteArticleDialog from "./DeleteArticleDialog";
import { disableLinkAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useState } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

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
          <ContextMenuItem inset asChild>
            <Link href={`./${title}`}>Open</Link>
          </ContextMenuItem>
          <ContextMenuItem inset>Edit</ContextMenuItem>
          <ContextMenuItem
            className="text-destructive"
            onClick={() => {
              setDialogIsOpen(true);
            }}
            inset
          >
            Delete
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
