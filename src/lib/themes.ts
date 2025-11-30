import { ThemeConfig, PresentationTheme } from './types';

export const THEMES: Record<PresentationTheme, ThemeConfig> = {
  'professional-blue': {
    id: 'professional-blue',
    name: 'Professional Blue',
    description: 'Trust and authority for institutional settings',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    textColor: '#ffffff',
    accentColor: '#60a5fa',
    secondaryColor: '#1e40af',
  },
  'medical-green': {
    id: 'medical-green',
    name: 'Medical Green',
    description: 'Calm and healing for healthcare presentations',
    background: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
    textColor: '#ffffff',
    accentColor: '#6ee7b7',
    secondaryColor: '#047857',
  },
  'corporate-gray': {
    id: 'corporate-gray',
    name: 'Corporate Gray',
    description: 'Sophisticated and neutral for business',
    background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
    textColor: '#ffffff',
    accentColor: '#9ca3af',
    secondaryColor: '#374151',
  },
  'warm-orange': {
    id: 'warm-orange',
    name: 'Warm Orange',
    description: 'Energetic and inviting for engaging talks',
    background: 'linear-gradient(135deg, #c2410c 0%, #f97316 100%)',
    textColor: '#ffffff',
    accentColor: '#fdba74',
    secondaryColor: '#ea580c',
  },
  'elegant-purple': {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    description: 'Creative and refined for special occasions',
    background: 'linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)',
    textColor: '#ffffff',
    accentColor: '#d8b4fe',
    secondaryColor: '#7e22ce',
  },
  'minimal-black': {
    id: 'minimal-black',
    name: 'Minimal Black',
    description: 'Bold and impactful for modern presentations',
    background: 'linear-gradient(135deg, #000000 0%, #18181b 100%)',
    textColor: '#ffffff',
    accentColor: '#a1a1aa',
    secondaryColor: '#27272a',
  },
};

export const getTheme = (themeId?: PresentationTheme): ThemeConfig => {
  return THEMES[themeId || 'professional-blue'];
};
