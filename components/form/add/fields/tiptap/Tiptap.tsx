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

// please add lowlight languages here
const lowlightLanguages = [
  {
    name: "html",
    language: html,
  },
  {
    name: "css",
    langauge: css,
  },
  {
    name: "js",
    language: js,
  },
  {
    name: "ts",
    langauge: ts,
  },
];

// prop editable allows for custom styles and functionality, this component is reusable in both editing and displaying content
export default function Tiptap({ content, onChange, editable }: Props) {
  // different styles determined by editable
  function textBoxStyle() {
    if (editable) {
      return "rounded-md min-h-[300px] bg-backdropborder border border-input p-2 px-3";
    } else {
      return "rounded-md min-h-[300pxpx] bg-backdropborder";
    }
  }

  // init lowlight
  const lowlight = createLowlight();

  // steps to add new language:
  // 1. import language at the top of file
  // 2. add to lowlightLanguages array above
  lowlightLanguages.forEach((language) => {
    if (language.language) {
      lowlight.register(language.name, language.language);
    }
  });

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
      Youtube.configure({
        HTMLAttributes: {
          class: "w-full",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-primary text-primary-foreground p-6 rounded-md",
        },
      }),
    ],

    // editable and content are passed through props here
    editable,

    // content only determines initial value, not the onchange value
    content,
    editorProps: {
      attributes: {
        class: textBoxStyle(),
      },
    },

    // editor content is stored as html elements
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
