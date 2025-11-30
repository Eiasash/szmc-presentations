import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';
import { Presentation, Slide } from './types';
import { getTheme } from './themes';
import { marked } from 'marked';

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

export const exportToJSON = (presentation: Presentation): void => {
  const json = JSON.stringify(presentation, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${presentation.title.replace(/[^a-z0-9]/gi, '_')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToMarkdown = (presentation: Presentation): void => {
  let markdown = `# ${presentation.title}\n\n`;
  markdown += `*Created: ${new Date(presentation.createdAt).toLocaleDateString()}*\n\n`;
  markdown += `---\n\n`;

  presentation.slides.forEach((slide: Slide, index: number) => {
    markdown += `## ${slide.title}\n\n`;
    markdown += `${slide.content}\n\n`;
    if (slide.imageUrl) {
      markdown += `![Slide Image](${slide.imageUrl})\n\n`;
    }
    if (index < presentation.slides.length - 1) {
      markdown += `---\n\n`;
    }
  });

  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${presentation.title.replace(/[^a-z0-9]/gi, '_')}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToHTML = (presentation: Presentation): void => {
  const theme = getTheme(presentation.theme);
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${presentation.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Arial', sans-serif;
      background: ${theme.background};
      color: ${theme.textColor};
      overflow-x: hidden;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    h1 {
      font-size: 48px;
      margin-bottom: 20px;
      text-align: center;
    }
    .meta {
      text-align: center;
      opacity: 0.8;
      margin-bottom: 40px;
    }
    .slide {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 40px;
      margin-bottom: 40px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .slide h2 {
      font-size: 36px;
      margin-bottom: 20px;
      color: ${theme.accentColor};
    }
    .slide-content {
      font-size: 18px;
      line-height: 1.7;
      white-space: pre-wrap;
    }
    .slide img {
      max-width: 100%;
      border-radius: 8px;
      margin: 20px 0;
    }
    .slide-number {
      text-align: right;
      opacity: 0.6;
      margin-top: 20px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${presentation.title}</h1>
    <p class="meta">Created: ${new Date(presentation.createdAt).toLocaleDateString()}</p>
`;

  presentation.slides.forEach((slide: Slide, index: number) => {
    html += `    <div class="slide">
      <h2>${slide.title}</h2>
`;
    if (slide.imageUrl) {
      html += `      <img src="${slide.imageUrl}" alt="${slide.title}" />
`;
    }
    html += `      <div class="slide-content">${slide.content}</div>
      <div class="slide-number">Slide ${index + 1} of ${presentation.slides.length}</div>
    </div>
`;
  });

  html += `  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${presentation.title.replace(/[^a-z0-9]/gi, '_')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToText = (presentation: Presentation): void => {
  let text = `${presentation.title}\n`;
  text += `${'='.repeat(presentation.title.length)}\n\n`;
  text += `Created: ${new Date(presentation.createdAt).toLocaleDateString()}\n\n`;

  presentation.slides.forEach((slide: Slide, index: number) => {
    text += `\n--- Slide ${index + 1} ---\n\n`;
    text += `${slide.title}\n`;
    text += `${'-'.repeat(slide.title.length)}\n\n`;
    text += `${slide.content}\n`;
  });

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${presentation.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
