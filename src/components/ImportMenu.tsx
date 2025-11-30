import { useState, useRef } from 'react';
import { Presentation } from '@/lib/types';
import { 
  importFromJSON, 
  importFromMarkdown, 
  importFromHTML, 
  readFileAsText 
} from '@/lib/importUtils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileJs, FileText, FileHtml, FileCode } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface ImportMenuProps {
  onImport: (presentation: Presentation) => void;
}

export function ImportMenu({ onImport }: ImportMenuProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const [importTitle, setImportTitle] = useState('');
  const [pendingImport, setPendingImport] = useState<{ type: string; content: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImportType, setCurrentImportType] = useState<'json' | 'markdown' | 'html' | 'text'>('json');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>, type: 'json' | 'markdown' | 'html' | 'text') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const content = await readFileAsText(file);
      
      if (type === 'json') {
        const presentation = importFromJSON(content);
        onImport(presentation);
        toast.success('Presentation imported from JSON');
      } else {
        setPendingImport({ type, content });
        setImportTitle(file.name.replace(/\.[^/.]+$/, ''));
        setShowTitleDialog(true);
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error(`Failed to import ${type.toUpperCase()} file`);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const completeImport = () => {
    if (!pendingImport || !importTitle.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      let presentation: Presentation;

      switch (pendingImport.type) {
        case 'markdown':
          presentation = importFromMarkdown(pendingImport.content, importTitle);
          break;
        case 'html':
          presentation = importFromHTML(pendingImport.content, importTitle);
          break;
        case 'text':
          presentation = importFromMarkdown(pendingImport.content, importTitle);
          break;
        default:
          throw new Error('Unknown import type');
      }

      onImport(presentation);
      toast.success(`Presentation imported from ${pendingImport.type.toUpperCase()}`);
      setShowTitleDialog(false);
      setPendingImport(null);
      setImportTitle('');
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to create presentation');
    }
  };

  const triggerFileInput = (type: 'json' | 'markdown' | 'html' | 'text') => {
    setCurrentImportType(type);
    if (fileInputRef.current) {
      const accept = {
        json: '.json',
        markdown: '.md,.markdown',
        html: '.html,.htm',
        text: '.txt',
      }[type];
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileSelect(e, currentImportType)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isImporting}>
            <Upload className="mr-2" />
            Import
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => triggerFileInput('json')} disabled={isImporting}>
            <FileJs className="mr-2" />
            Import from JSON
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => triggerFileInput('markdown')} disabled={isImporting}>
            <FileCode className="mr-2" />
            Import from Markdown
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => triggerFileInput('html')} disabled={isImporting}>
            <FileHtml className="mr-2" />
            Import from HTML
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => triggerFileInput('text')} disabled={isImporting}>
            <FileText className="mr-2" />
            Import from Text
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showTitleDialog} onOpenChange={setShowTitleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Presentation</DialogTitle>
            <DialogDescription>
              Enter a title for your imported presentation
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="import-title">Presentation Title</Label>
            <Input
              id="import-title"
              placeholder="Enter title..."
              value={importTitle}
              onChange={(e) => setImportTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  completeImport();
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTitleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={completeImport} className="bg-accent hover:bg-accent/90">
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
