import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';
import { Presentation, Slide } from './types';
import { getTheme } from './themes';

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const extractGradientColors = (gradient: string): string[] => {
  const colorMatches = gradient.match(/#[0-9A-Fa-f]{6}/g);
  return colorMatches || ['#000000'];
};

export const exportToPDF = (presentation: Presentation): void => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const theme = getTheme(presentation.theme);
  const gradientColors = extractGradientColors(theme.background);
  const primaryBgColor = gradientColors[0];
  const bgRgb = hexToRgb(primaryBgColor);
  const textRgb = hexToRgb(theme.textColor);
  const accentRgb = hexToRgb(theme.accentColor);

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  presentation.slides.forEach((slide: Slide, index: number) => {
    if (index > 0) {
      pdf.addPage();
    }

    pdf.setFillColor(bgRgb.r, bgRgb.g, bgRgb.b);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    pdf.setTextColor(textRgb.r, textRgb.g, textRgb.b);
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    
    const titleLines = pdf.splitTextToSize(slide.title, contentWidth);
    pdf.text(titleLines, margin, margin + 15);

    const titleHeight = titleLines.length * 12;

    pdf.setFillColor(accentRgb.r, accentRgb.g, accentRgb.b);
    pdf.rect(margin, margin + titleHeight + 5, contentWidth, 2, 'F');

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    
    const contentLines = pdf.splitTextToSize(slide.content, contentWidth);
    pdf.text(contentLines, margin, margin + titleHeight + 20);

    pdf.setFontSize(10);
    pdf.text(
      `${index + 1} / ${presentation.slides.length}`,
      pageWidth - margin - 20,
      pageHeight - 10
    );
  });

  const fileName = `${presentation.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
  pdf.save(fileName);
};

export const exportToPowerPoint = async (presentation: Presentation): Promise<void> => {
  const pptx = new PptxGenJS();
  
  pptx.author = 'SZMC Presentations';
  pptx.company = 'SZMC';
  pptx.title = presentation.title;

  const theme = getTheme(presentation.theme);
  const gradientColors = extractGradientColors(theme.background);

  presentation.slides.forEach((slide: Slide) => {
    const pptxSlide = pptx.addSlide();

    pptxSlide.background = {
      fill: gradientColors[0],
    };

    pptxSlide.addText(slide.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 44,
      bold: true,
      color: theme.textColor.replace('#', ''),
      fontFace: 'Arial',
    });

    pptxSlide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.6,
      w: 9,
      h: 0.05,
      fill: { color: theme.accentColor.replace('#', '') },
      line: { type: 'none' },
    });

    const contentLines = slide.content.split('\n').filter(line => line.trim());
    
    pptxSlide.addText(contentLines.join('\n'), {
      x: 0.5,
      y: 2.0,
      w: 9,
      h: 3.5,
      fontSize: 18,
      color: theme.textColor.replace('#', ''),
      fontFace: 'Arial',
      valign: 'top',
      align: 'left',
    });
  });

  const fileName = `${presentation.title.replace(/[^a-z0-9]/gi, '_')}.pptx`;
  await pptx.writeFile({ fileName });
};
