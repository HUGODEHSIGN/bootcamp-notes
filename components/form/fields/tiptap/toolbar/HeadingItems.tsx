import { Editor } from "@tiptap/react";
import { Heading1, Heading2 } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

type Props = {
  editor: Editor | null;
};

// heading button information
export default function HeadingItems({ editor }: Props) {
  const headingItems = [
    {
      name: "heading",
      function: () => editor!.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: <Heading1 className="w-4 h-4" />,
      level: 1,
    },
    {
      name: "heading",
      function: () => editor!.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: <Heading2 className="w-4 h-4" />,
      level: 2,
    },
  ];

  function renderHeadingItems() {
    return headingItems.map((item) => (
      <Toggle
        size="sm"
        pressed={editor!.isActive(item.name, { level: item.level })}
        onPressedChange={item.function}
        key={item.name + item.level}
      >
        {item.icon}
      </Toggle>
    ));
  }

  return <>{renderHeadingItems()}</>;
}
