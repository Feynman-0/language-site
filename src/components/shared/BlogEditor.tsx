import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { CharacterCount } from '@tiptap/extension-character-count';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Quote, 
  Undo, 
  Redo, 
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Code,
  Trash2
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const BlogEditor = ({ content, onChange, placeholder = 'Tell your story...' }: BlogEditorProps) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        // Ensure no conflicts with our custom ones
      }),
      Placeholder.configure({ placeholder }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-2xl max-w-full h-auto my-8' },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-gold underline' },
      }),
      Table.configure({ resizable: true }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-gold prose-lg max-w-none focus:outline-none min-h-[400px] p-6',
      },
    },
    onBeforeCreate: () => {
      console.log('Editor creating...');
    },
    onCreate: () => {
      console.log('Editor created!');
      setEditorLoaded(true);
    },
  });

  if (!editor) {
    return <div className="p-12 border rounded-3xl bg-muted/10 animate-pulse text-center">Initializing...</div>;
  }

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="border border-border/60 rounded-3xl bg-white shadow-xl overflow-visible">
        {/* Simplified Toolbar to ensure no crashes */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-ivory/20 border-b border-border/40 rounded-t-3xl">
          <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
            <Italic className="h-4 w-4" />
          </Toggle>
          <div className="w-px h-4 bg-border mx-1" />
          <Toggle size="sm" pressed={editor.isActive('heading', { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1 className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('heading', { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <div className="w-px h-4 bg-border mx-1" />
          <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered className="h-4 w-4" />
          </Toggle>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="sm" onClick={setLink}>
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={addImage}>
            <ImageIcon className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()}>
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <EditorContent editor={editor} />

        <div className="p-2 border-t text-[10px] text-muted-foreground bg-muted/5 rounded-b-3xl flex justify-between">
          <span>{editor.storage.characterCount?.characters() || 0} characters</span>
          <span className="text-gold italic">Ready to write</span>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BlogEditor;
