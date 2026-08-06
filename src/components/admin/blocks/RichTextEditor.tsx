import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, List, ListOrdered, Link2, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const tools = [
    { icon: Bold, command: 'bold', label: 'Bold' },
    { icon: Italic, command: 'italic', label: 'Italic' },
    { icon: Underline, command: 'underline', label: 'Underline' },
    { type: 'separator' },
    { icon: Heading1, command: 'formatBlock', value: 'h2', label: 'Heading 1' },
    { icon: Heading2, command: 'formatBlock', value: 'h3', label: 'Heading 2' },
    { type: 'separator' },
    { icon: List, command: 'insertUnorderedList', label: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', label: 'Numbered List' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', label: 'Quote' },
    { type: 'separator' },
    { icon: AlignLeft, command: 'justifyLeft', label: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', label: 'Center' },
    { icon: AlignRight, command: 'justifyRight', label: 'Align Right' },
    { type: 'separator' },
    { icon: Link2, action: insertLink, label: 'Insert Link' },
  ];

  return (
    <div className="border border-input rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 bg-muted/50 border-b border-input">
        {tools.map((tool, idx) => {
          if (tool.type === 'separator') {
            return <div key={idx} className="w-px h-6 bg-border mx-1" />;
          }
          const Icon = tool.icon!;
          return (
            <Button
              key={idx}
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              title={tool.label}
              onMouseDown={(e) => {
                e.preventDefault();
                if (tool.action) {
                  tool.action();
                } else if (tool.value) {
                  execCommand(tool.command!, tool.value);
                } else {
                  execCommand(tool.command!);
                }
              }}
            >
              <Icon className="h-3.5 w-3.5" />
            </Button>
          );
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className={cn(
          "min-h-[200px] p-4 text-sm focus:outline-none",
          "prose prose-sm max-w-none",
          "[&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2",
          "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-2",
          "[&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic",
          "[&_a]:text-primary [&_a]:underline"
        )}
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleInput}
        onBlur={handleInput}
      />
    </div>
  );
}
