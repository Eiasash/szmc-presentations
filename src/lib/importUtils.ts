import { Presentation, Slide, PresentationTheme } from './types';
import { marked } from 'marked';

export const importFromJSON = (jsonString: string): Presentation => {
  const data = JSON.parse(jsonString);
  
  if (!data.id || !data.title || !Array.isArray(data.slides)) {
    throw new Error('Invalid presentation format');
  }

  return {
    id: `pres-${Date.now()}`,
    title: data.title,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    theme: (data.theme as PresentationTheme) || 'professional-blue',
    slides: data.slides.map((slide: any, index: number) => ({
      id: `slide-${Date.now()}-${index}`,
      title: slide.title || 'Untitled Slide',
      content: slide.content || '',
      imageUrl: slide.imageUrl,
      imagePosition: slide.imagePosition || 'top',
    })),
  };
};

export const importFromMarkdown = (markdown: string, title: string): Presentation => {
  const slides: Slide[] = [];
  const sections = markdown.split(/^#{1,2}\s+/gm).filter(s => s.trim());

  sections.forEach((section, index) => {
    const lines = section.trim().split('\n');
    const slideTitle = lines[0]?.trim() || `Slide ${index + 1}`;
    const content = lines.slice(1).join('\n').trim();

    slides.push({
      id: `slide-${Date.now()}-${index}`,
      title: slideTitle,
      content: content,
    });
  });

  if (slides.length === 0) {
    slides.push({
      id: `slide-${Date.now()}-0`,
      title: title || 'Imported Presentation',
      content: markdown,
    });
  }

  return {
    id: `pres-${Date.now()}`,
    title: title || 'Markdown Import',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    theme: 'professional-blue',
    slides: slides,
  };
};

export const importFromHTML = (html: string, title: string): Presentation => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const slides: Slide[] = [];

  const sections = doc.querySelectorAll('section, .slide, article');
  
  if (sections.length === 0) {
    const headings = doc.querySelectorAll('h1, h2');
    headings.forEach((heading, index) => {
      const slideTitle = heading.textContent?.trim() || `Slide ${index + 1}`;
      let content = '';
      let nextElement = heading.nextElementSibling;
      
      while (nextElement && !['H1', 'H2'].includes(nextElement.tagName)) {
        content += nextElement.textContent + '\n';
        nextElement = nextElement.nextElementSibling;
      }

      slides.push({
        id: `slide-${Date.now()}-${index}`,
        title: slideTitle,
        content: content.trim(),
      });
    });
  } else {
    sections.forEach((section, index) => {
      const heading = section.querySelector('h1, h2, h3');
      const slideTitle = heading?.textContent?.trim() || `Slide ${index + 1}`;
      const content = section.textContent?.replace(slideTitle, '').trim() || '';

      slides.push({
        id: `slide-${Date.now()}-${index}`,
        title: slideTitle,
        content: content,
      });
    });
  }

  if (slides.length === 0) {
    slides.push({
      id: `slide-${Date.now()}-0`,
      title: title || 'HTML Import',
      content: doc.body.textContent?.trim() || '',
    });
  }

  return {
    id: `pres-${Date.now()}`,
    title: title || 'HTML Import',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    theme: 'professional-blue',
    slides: slides,
  };
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};
