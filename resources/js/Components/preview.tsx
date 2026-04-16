"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useMemo } from "react";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  // Usamos useMemo para que el editor no se recree innecesariamente
  const editor = useEditor({
    editable: false, // Modo solo lectura
    extensions: [StarterKit, Underline],
    content: value,
    immediatelyRender: false, // <--- AGREGA ESTA LÍNEA AQUÍ TAMBIÉN
    editorProps: {
        attributes: {
            class: "prose dark:prose-invert max-w-none text-sm" // Tailwind Prose para estilos bonitos
        }
    }
  });

  return <EditorContent editor={editor} />;
};