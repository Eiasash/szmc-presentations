export interface Slide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition?: 'top' | 'bottom' | 'left' | 'right' | 'background';
}

export interface Presentation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  slides: Slide[];
  theme?: PresentationTheme;
}

export type PresentationTheme = 
  | 'professional-blue'
  | 'medical-green'
  | 'corporate-gray'
  | 'warm-orange'
  | 'elegant-purple'
  | 'minimal-black';

export interface ThemeConfig {
  id: PresentationTheme;
  name: string;
  description: string;
  background: string;
  textColor: string;
  accentColor: string;
  secondaryColor: string;
}
