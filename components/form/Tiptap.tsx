import Toolbar from "./Toolbar";
import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { createLowlight } from "lowlight";

type Props = {
  content: string;
  onChange: (richText: string) => void;
  editable: boolean;
};

export default function Tiptap({ content, onChange, editable }: Props) {
  function textBoxStyle() {
    if (editable) {
      return "rounded-md min-h-[150px] bg-backdropborder border border-input p-2 px-3";
    } else {
      return "rounded-md min-h-[150px] bg-backdropborder";
    }
  }

  const lowlight = createLowlight();

  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("js", js);
  lowlight.register("ts", ts);

  const editor = useEditor({
    extensions: [
      // StarterKit.configure(),
      Document,
      Text,
      Paragraph,
      Bold,
      Italic,
      Underline,
      Strike,
      Youtube,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-primary text-primary-foreground p-6 rounded-md",
        },
      }),
    ],
    editable,
    content,
    editorProps: {
      attributes: {
        class: textBoxStyle(),
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Toolbar editor={editor} show={editable} />
      <EditorContent editor={editor} />
    </div>
  );
}
