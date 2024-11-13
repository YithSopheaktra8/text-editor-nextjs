"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./toolBar";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { useState } from "react";
import Preview from "./preview";

export default function RichTextEditor({ content, onChange }) {
    const [htmlContent, setHtmlContent] = useState(content);
    const [showPreview, setShowPreview] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-3",
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-3",
                },
            }),
            Highlight,
            Image,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML());
            const html = editor.getHTML();
            onChange(editor.getHTML());
            setHtmlContent(html);
        },
    });

    const handlePreviewClick = () => {
        setShowPreview(!showPreview);
      };

    return (
        <div>
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
            <button
                onClick={handlePreviewClick}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
                {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            {showPreview && <Preview content={htmlContent} />}
        </div>
    );
}
