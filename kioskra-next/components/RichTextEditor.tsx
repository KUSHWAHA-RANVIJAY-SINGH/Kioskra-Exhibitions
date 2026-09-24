"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xs text-white/40">
      Loading Visual Editor...
    </div>
  ),
});

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article content visually...",
  minHeight = "260px",
}: RichTextEditorProps) {

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "link",
  ];

  return (
    <div className="rich-text-editor-container text-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      <style jsx global>{`
        .rich-text-editor-container .ql-toolbar.ql-snow {
          background-color: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          border-top-left-radius: 0.85rem;
          border-top-right-radius: 0.85rem;
        }
        .rich-text-editor-container .ql-toolbar .ql-stroke {
          stroke: rgba(255, 255, 255, 0.7);
        }
        .rich-text-editor-container .ql-toolbar .ql-fill {
          fill: rgba(255, 255, 255, 0.7);
        }
        .rich-text-editor-container .ql-toolbar .ql-picker {
          color: rgba(255, 255, 255, 0.8);
        }
        .rich-text-editor-container .ql-toolbar .ql-picker-options {
          background-color: #191a1a;
          border-color: rgba(255, 255, 255, 0.15);
          color: white;
        }
        .rich-text-editor-container .ql-container.ql-snow {
          background-color: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.12);
          border-bottom-left-radius: 0.85rem;
          border-bottom-right-radius: 0.85rem;
          color: white;
          font-size: 0.875rem;
          min-height: ${minHeight};
        }
        .rich-text-editor-container .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.35);
          font-style: normal;
        }
        .rich-text-editor-container .ql-editor {
          min-height: ${minHeight};
        }
      `}</style>
    </div>
  );
}
