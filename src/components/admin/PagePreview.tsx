import { Block } from './blocks/BlockTypes';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PagePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  blocks: Block[];
}

export default function PagePreview({ open, onOpenChange, title, blocks }: PagePreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded">Preview</span>
            {title || 'Untitled Page'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Preview of the page content blocks before publishing.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 h-full">
          <div className="min-h-full bg-background">
            {blocks.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No content blocks to preview
              </div>
            ) : (
              blocks.map((block) => (
                <BlockRenderer key={block.id} blockType={block.block_type} content={block.content} />
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
