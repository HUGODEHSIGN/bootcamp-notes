import HeadingItems from "./HeadingItems";
import StyleItems from "./StyleItems";
import { Editor } from "@tiptap/react";

import { Separator } from "@/components/ui/separator";

import YoutubeURLDialog from "../YoutubeURLDialog";

type Props = {
  editor: Editor | null;
  show: boolean;
};

export default function Toolbar({ editor, show }: Props) {
  if (!editor || !show) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2 border rounded-md p-1">
      <StyleItems editor={editor} />

      <Separator orientation="vertical" className="h-9" />

      <HeadingItems editor={editor} />
      <Separator orientation="vertical" className="h-9" />

      <YoutubeURLDialog editor={editor} />
    </div>
  );
}
