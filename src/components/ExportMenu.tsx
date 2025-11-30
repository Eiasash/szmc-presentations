import { useState } from 'react';
import { Presentation } from '@/lib/types';
import { exportToPDF, exportToPowerPoint } from '@/lib/exportUtils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FilePdf, FilePpt } from '@phosphor-icons/react';
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <Download className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting}>
          <FilePdf className="mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPowerPoint} disabled={isExporting}>
          <FilePpt className="mr-2" />
          Export as PowerPoint
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
