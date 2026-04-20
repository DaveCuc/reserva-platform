import React, { useEffect } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Bold, Italic, List, ListOrdered, Strikethrough, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

const Toolbar = ({ editor }) => {
  // Estado fantasma para forzar que los botones se pinten cuando el cursor cambie
  const [, setRerender] = React.useState(0);

  useEffect(() => {
    if (!editor) return;
    
    const updateToolbar = () => setRerender(prev => prev + 1);
    editor.on('transaction', updateToolbar);

    return () => {
      editor.off('transaction', updateToolbar);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-input bg-white rounded-t-md p-2 flex flex-wrap gap-1">
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <div className="w-[1px] h-8 bg-brand-soft/40 mx-1"></div>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive("bold") ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive("italic") ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <Italic className="h-4 w-4" />
      </button>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive("strike") ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <Strikethrough className="h-4 w-4" />
      </button>
      <div className="w-[1px] h-8 bg-brand-soft/40 mx-1"></div>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('left').run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive({ textAlign: 'left' }) ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <AlignLeft className="h-4 w-4" />
      </button>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('center').run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive({ textAlign: 'center' }) ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <AlignCenter className="h-4 w-4" />
      </button>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('right').run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive({ textAlign: 'right' }) ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <AlignRight className="h-4 w-4" />
      </button>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('justify').run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive({ textAlign: 'justify' }) ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <AlignJustify className="h-4 w-4" />
      </button>
      <div className="w-[1px] h-8 bg-brand-soft/40 mx-1"></div>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive("bulletList") ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <List className="h-4 w-4" />
      </button>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} 
        className={`p-2 rounded transition-colors ${editor.isActive("orderedList") ? "bg-brand-soft text-white" : "text-brand-text hover:bg-brand-pale"}`}
      >
        <ListOrdered className="h-4 w-4" />
      </button>
    </div>
  );
};

export const Editor = ({ onChange, value }) => {
  const editor = useEditor({
    extensions: [
      StarterKit, 
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[150px] w-full rounded-b-md border border-t-0 border-input bg-white px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto prose prose-sm max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[150px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
