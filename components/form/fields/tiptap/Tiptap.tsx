import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/base16/ocean.css";
import { common, createLowlight } from "lowlight";

import Toolbar from "@/components/form/fields/tiptap/toolbar/Toolbar";

type Props = {
  content?: string;
  onChange?: (richText: string) => void;
  editable: boolean;
};

// prop editable allows for custom styles and functionality, this component is reusable in both editing and displaying content
export default function Tiptap({ content, onChange, editable }: Props) {
  // different styles determined by editable
  function textBoxStyle() {
    if (editable) {
      return "rounded-md min-h-[300px] bg-backdropborder border border-input p-3";
    } else {
      return "rounded-md min-h-[300pxpx] bg-backdropborder";
    }
  }

  // // init lowlight
  const lowlight = createLowlight(common);

  // add extensions and configure editor here
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({
        levels: [1, 2],
      }),

      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-[#292524] text-[#fafaf9] p-6 rounded-md",
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "w-full",
        },
      }),
    ],

    // this component is used to render article data as well as to edit it, editable prop allows dual use
    editable,

    // content only determines initial value, not the onchange value
    content,
    editorProps: {
      attributes: {
        class: textBoxStyle(),
      },
    },

    onUpdate({ editor }) {
      // make onChange optional if tiptap is read only
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Toolbar editor={editor} show={editable} />
      <EditorContent editor={editor} />
    </div>
  );
}
