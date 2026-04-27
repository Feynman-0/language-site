import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { CharacterCount } from '@tiptap/extension-character-count';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Quote, 
  Undo, 
  Redo, 
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Code,
  Trash2,
  Heading3,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = 'Start writing your masterpiece...' }: RichTextEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-2xl shadow-xl max-w-full h-auto my-8 mx-auto block ring-4 ring-white shadow-gold/10',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-gold underline font-bold hover:text-gold/80 transition-colors',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-fixed w-full my-8',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-gold prose-lg md:prose-xl max-w-none focus:outline-none min-h-[500px] p-8 md:p-12 bg-white/50 transition-all selection:bg-gold/20',
      },
    },
    immediatelyRender: false,
  });

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result && editor) {
          editor.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
    if (event.target) event.target.value = '';
  }, [editor]);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (editor && content !== editor.getHTML() && content === "") {
      editor.commands.setContent("");
    }
  }, [content, editor]);

  if (!isMounted || !editor) {
    return (
      <div className="border border-border/60 rounded-3xl bg-white/50 p-12 flex items-center justify-center min-h-[500px] backdrop-blur-sm">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-display text-sm tracking-widest uppercase animate-pulse">Initializing Studio...</p>
        </div>
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const MenuButton = ({ 
    onClick, 
    isActive = false, 
    children, 
    tooltip 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode; 
    tooltip: string;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          pressed={isActive}
          onPressedChange={() => {
            editor.chain().focus().run();
            onClick();
          }}
          className="h-10 w-10 p-0 data-[state=on]:bg-gold/15 data-[state=on]:text-gold hover:bg-gold/5 transition-all rounded-lg border-transparent data-[state=on]:border-gold/20 border shadow-none"
        >
          {children}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent side="top" className="z-[10000] bg-charcoal text-white font-bold border-none shadow-2xl">
        <p className="text-[10px] uppercase tracking-widest">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider delayDuration={0}>
      <div className="border border-border/60 rounded-[2rem] bg-white shadow-2xl shadow-gold/5 ring-1 ring-gold/5 overflow-visible">
        <div className="flex flex-wrap items-center gap-2 p-3 bg-ivory/30 border-b border-border/40 backdrop-blur-2xl sticky top-20 z-[40] rounded-t-[2rem] shadow-sm px-4">
          <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-xl border border-border/20 shadow-sm">
            <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} tooltip="Bold">
              <Bold className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} tooltip="Italic">
              <Italic className="h-4 w-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-xl border border-border/20 shadow-sm">
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} tooltip="H1">
              <Heading1 className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} tooltip="H2">
              <Heading2 className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} tooltip="H3">
              <Heading3 className="h-4 w-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-xl border border-border/20 shadow-sm">
            <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} tooltip="Bullets">
              <List className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} tooltip="Numbers">
              <ListOrdered className="h-4 w-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-xl border border-border/20 shadow-sm">
            <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} tooltip="Quote">
              <Quote className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} tooltip="Code">
              <Code className="h-4 w-4" />
            </MenuButton>
          </div>

          <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-xl border border-border/20 shadow-sm">
            <MenuButton onClick={setLink} isActive={editor.isActive('link')} tooltip="Link">
              <LinkIcon className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={triggerUpload} tooltip="Upload Image">
              <ImageIcon className="h-4 w-4" />
            </MenuButton>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload}
            />
          </div>

          <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-xl border border-border/20 shadow-sm">
            <MenuButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} tooltip="Table">
              <TableIcon className="h-4 w-4" />
            </MenuButton>
            {editor.isActive('table') && (
              <MenuButton onClick={() => editor.chain().focus().deleteTable().run()} tooltip="Delete Table">
                <Trash2 className="h-4 w-4 text-red-500" />
              </MenuButton>
            )}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-xl border border-border/20 shadow-sm">
            <MenuButton onClick={() => editor.chain().focus().undo().run()} tooltip="Undo">
              <Undo className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().redo().run()} tooltip="Redo">
              <Redo className="h-4 w-4" />
            </MenuButton>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-b-[2rem]">
          <EditorContent editor={editor} />
        </div>

        <div className="p-4 border-t border-border/40 bg-muted/20 flex justify-between items-center rounded-b-[2rem]">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Character Count</span>
              <span className="text-sm font-display font-bold text-charcoal">{editor.storage.characterCount?.characters() || 0}</span>
            </div>
            <div className="flex flex-col border-l border-border/60 pl-8">
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Word Count</span>
              <span className="text-sm font-display font-bold text-charcoal">{editor.storage.characterCount?.words() || 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-green-50/50 rounded-full border border-green-100 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-200" />
            <span className="text-[10px] text-green-700 font-bold uppercase tracking-widest">Writing Studio Active</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default RichTextEditor;
