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
  // component is part of component 'TipTap', which is used to render article data, show prop allows this component to be hidden when not in use
  if (!editor || !show) {
    return;
  }

  return (
    <div className="flex flex-row flex-wrap gap-2 border rounded-md p-1">
      <StyleItems editor={editor} />

      {/* separator doesn't render without height */}
      <Separator orientation="vertical" className="h-9" />

      <HeadingItems editor={editor} />

      <Separator orientation="vertical" className="h-9" />

      <YoutubeURLDialog editor={editor} />
    </div>
  );
}
