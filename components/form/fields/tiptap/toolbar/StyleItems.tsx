import { Editor } from "@tiptap/react";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

type Props = {
  editor: Editor | null;
};

export default function StyleItems({ editor }: Props) {
  const styleItems = [
    {
      name: "bold",
      function: () => editor!.chain().focus().toggleBold().run(),
      icon: <Bold className="w-4 h-4" />,
    },
    {
      name: "italic",
      function: () => editor!.chain().focus().toggleItalic().run(),
      icon: <Italic className="w-4 h-4" />,
    },
    {
      name: "underline",
      function: () => editor!.chain().focus().toggleUnderline().run(),
      icon: <Underline className="w-4 h-4" />,
    },
    {
      name: "strike",
      function: () => editor!.chain().focus().toggleStrike().run(),
      icon: <Strikethrough className="w-4 h-4" />,
    },
    {
      name: "codeBlock",
      function: () => editor!.chain().focus().toggleCodeBlock().run(),
      icon: <Code className="w-4 h-4" />,
    },
  ];

  function renderStyleItems() {
    return styleItems.map((item) => (
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

  return <>{renderStyleItems()}</>;
}
