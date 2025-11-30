import { useState } from 'react';
import { Presentation } from '@/lib/types';
import { 
  exportToPDF, 
  exportToPowerPoint, 
  exportToJSON, 
  exportToMarkdown, 
  exportToHTML, 
  exportToText 
} from '@/lib/exportUtils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Download, FilePdf, FilePpt, FileJs, FileCode, FileHtml, FileText } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface ExportMenuProps {
  presentation: Presentation;
}

export function ExportMenu({ presentation }: ExportMenuProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!presentation.slides || presentation.slides.length === 0) {
      toast.error('Cannot export empty presentation');
      return;
    }

    setIsExporting(true);
    try {
      exportToPDF(presentation);
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPowerPoint = async () => {
    if (!presentation.slides || presentation.slides.length === 0) {
      toast.error('Cannot export empty presentation');
      return;
    }

    setIsExporting(true);
    try {
      await exportToPowerPoint(presentation);
      toast.success('PowerPoint exported successfully');
    } catch (error) {
      console.error('PowerPoint export error:', error);
      toast.error('Failed to export PowerPoint');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    if (!presentation.slides || presentation.slides.length === 0) {
      toast.error('Cannot export empty presentation');
      return;
    }

    try {
      exportToJSON(presentation);
      toast.success('JSON exported successfully');
    } catch (error) {
      console.error('JSON export error:', error);
      toast.error('Failed to export JSON');
    }
  };

  const handleExportMarkdown = () => {
    if (!presentation.slides || presentation.slides.length === 0) {
      toast.error('Cannot export empty presentation');
      return;
    }

    try {
      exportToMarkdown(presentation);
      toast.success('Markdown exported successfully');
    } catch (error) {
      console.error('Markdown export error:', error);
      toast.error('Failed to export Markdown');
    }
  };

  const handleExportHTML = () => {
    if (!presentation.slides || presentation.slides.length === 0) {
      toast.error('Cannot export empty presentation');
      return;
    }

    try {
      exportToHTML(presentation);
      toast.success('HTML exported successfully');
    } catch (error) {
      console.error('HTML export error:', error);
      toast.error('Failed to export HTML');
    }
  };

  const handleExportText = () => {
    if (!presentation.slides || presentation.slides.length === 0) {
      toast.error('Cannot export empty presentation');
      return;
    }

    try {
      exportToText(presentation);
      toast.success('Text exported successfully');
    } catch (error) {
      console.error('Text export error:', error);
      toast.error('Failed to export Text');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <Download className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Presentation Formats</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting}>
          <FilePdf className="mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPowerPoint} disabled={isExporting}>
          <FilePpt className="mr-2" />
          Export as PowerPoint
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Document Formats</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleExportHTML} disabled={isExporting}>
          <FileHtml className="mr-2" />
          Export as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportMarkdown} disabled={isExporting}>
          <FileCode className="mr-2" />
          Export as Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportText} disabled={isExporting}>
          <FileText className="mr-2" />
          Export as Text
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Data Format</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleExportJSON} disabled={isExporting}>
          <FileJs className="mr-2" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
