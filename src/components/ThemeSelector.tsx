import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Palette, Check } from '@phosphor-icons/react';
import { PresentationTheme } from '@/lib/types';
import { THEMES } from '@/lib/themes';

interface ThemeSelectorProps {
  currentTheme?: PresentationTheme;
  onThemeChange: (theme: PresentationTheme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleThemeSelect = (themeId: PresentationTheme) => {
    onThemeChange(themeId);
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
      >
        <Palette className="mr-2" />
        Theme
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Choose Presentation Theme</DialogTitle>
            <DialogDescription>
              Select a visual theme that matches your presentation style
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {Object.values(THEMES).map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`relative p-4 rounded-lg border-2 transition-all text-left hover:border-accent ${
                  currentTheme === theme.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                {currentTheme === theme.id && (
                  <div className="absolute top-2 right-2 bg-accent text-accent-foreground rounded-full p-1">
                    <Check size={16} weight="bold" />
                  </div>
                )}
                <div
                  className="w-full h-24 rounded-md mb-3"
                  style={{ background: theme.background }}
                />
                <h3 className="font-semibold mb-1">{theme.name}</h3>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
