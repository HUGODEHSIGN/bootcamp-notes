import YoutubeURLDialog from "./YoutubeURLDialog";
import { Editor } from "@tiptap/react";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";

import { Toggle } from "../ui/toggle";

type Props = {
  editor: Editor | null;
  show: boolean;
};

export default function Toolbar({ editor, show }: Props) {
  if (!editor) {
    return null;
  }

  const addYoutubeVideo = (url: string) => {
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  return (
    // <div className='flex flex-row gap-2'>
    <div className={`flex flex-row gap-2 ${show ? "visible" : "invisible"}`}>
      {/* bold */}
      <Toggle
        size="sm"
        pressed={editor!.isActive("bold")}
        onPressedChange={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      {/* italic */}
      <Toggle
        size="sm"
        pressed={editor!.isActive("italic")}
        onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      {/* underline */}
      <Toggle
        size="sm"
        pressed={editor!.isActive("underline")}
        onPressedChange={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <Underline className="w-4 h-4" />
      </Toggle>
      {/* strike */}
      <Toggle
        size="sm"
        pressed={editor!.isActive("strike")}
        onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>
      {/* codeblock */}
      <Toggle
        size="sm"
        pressed={editor!.isActive("codeblock")}
        onPressedChange={() => editor?.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="w-4 h-4" />
      </Toggle>
      {/* add youtube video */}
      <YoutubeURLDialog handleSubmit={addYoutubeVideo} />
    </div>
  );
}
