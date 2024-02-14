import YoutubeURLDialog from "./YoutubeURLDialog";
import { Editor } from "@tiptap/react";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";

import { Toggle } from "../../../../ui/toggle";

type Props = {
  editor: Editor | null;
  show: boolean;
};

export default function Toolbar({ editor, show }: Props) {
  if (!editor || !show) {
    return null;
  }

  // follow format to add a button
  const toolbarItems = [
    {
      name: "bold",
      function: () => editor.chain().focus().toggleBold().run(),
      icon: <Bold className="w-4 h-4" />,
    },
    {
      name: "italic",
      function: () => editor.chain().focus().toggleItalic().run(),
      icon: <Italic className="w-4 h-4" />,
    },
    {
      name: "underline",
      function: () => editor.chain().focus().toggleUnderline().run(),
      icon: <Underline className="w-4 h-4" />,
    },
    {
      name: "strike",
      function: () => editor.chain().focus().toggleStrike().run(),
      icon: <Strikethrough className="w-4 h-4" />,
    },
    {
      name: "codeblock",
      function: () => editor.chain().focus().toggleCodeBlock().run(),
      icon: <Code className="w-4 h-4" />,
    },
  ];

  function renderToolbar() {
    return toolbarItems.map((item) => (
      <Toggle
        size="sm"
        pressed={editor!.isActive(item.name)}
        onPressedChange={item.function}
        key={item.name}
      >
        {item.icon}
      </Toggle>
    ));
  }

  return (
    <div className="flex flex-row gap-2 border rounded-md p-1">
      {renderToolbar()}

      <YoutubeURLDialog editor={editor} />
    </div>
  );
}
