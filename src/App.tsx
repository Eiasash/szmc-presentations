import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Presentation, Slide, PresentationTheme } from '@/lib/types';
import { PresentationTemplate } from '@/lib/templates';
import { PresentationList } from '@/components/PresentationList';
import { SlideEditor } from '@/components/SlideEditor';
import { PresentationViewer } from '@/components/PresentationViewer';
import { AIContentGenerator } from '@/components/AIContentGenerator';
import { ThemeSelector } from '@/components/ThemeSelector';
import { ExportMenu } from '@/components/ExportMenu';
import { ImportMenu } from '@/components/ImportMenu';
import { TemplateSelector } from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, ArrowLeft, Presentation as PresentationIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';

function App() {
  const [presentations, setPresentations] = useKV<Presentation[]>('presentations', []);
  const [currentPresentationId, setCurrentPresentationId] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newPresentationTitle, setNewPresentationTitle] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const currentPresentation = presentations?.find((p) => p.id === currentPresentationId);

  const createPresentation = () => {
    if (!newPresentationTitle.trim()) {
      toast.error('Please enter a presentation title');
      return;
    }

    const newPresentation: Presentation = {
      id: `pres-${Date.now()}`,
      title: newPresentationTitle,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      theme: 'professional-blue',
      slides: [
        {
          id: `slide-${Date.now()}`,
          title: 'Welcome',
          content: 'Start editing your presentation here.',
        },
      ],
    };

    setPresentations((current) => [...(current || []), newPresentation]);
    setCurrentPresentationId(newPresentation.id);
    setCurrentSlideIndex(0);
    setNewPresentationTitle('');
    setShowNewDialog(false);
    toast.success('Presentation created');
  };

  const createPresentationFromAI = (slides: Slide[]) => {
    const newPresentation: Presentation = {
      id: `pres-${Date.now()}`,
      title: slides[0]?.title || 'AI Generated Presentation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      theme: 'professional-blue',
      slides: slides,
    };

    setPresentations((current) => [...(current || []), newPresentation]);
    setCurrentPresentationId(newPresentation.id);
    setCurrentSlideIndex(0);
  };

      ...slide,
      id: `slide-${Date.now()}-${index}`,
      ...slide,
      id: `slide-${Date.now()}-${index}`,
    const newPresentation: Presentation = {
      id: `pres-${Date.now()}`,
      title: title,
      id: `pres-${Date.now()}`,
      title: title,
      theme: template.theme,
      slides: newSlides,
      theme: template.theme,
      slides: newSlides,
    setPresentations((current) => [...(current || []), newPresentation]);
ationId(newPresentation.id);
    setCurrentSlideIndex(0);
    setCurrentPresentationId(newPresentation.id);
    setCurrentSlideIndex(0);

  const importPresentation = (presentation: Presentation) => {
    setPresentations((current) => [...(current || []), presentation]);
    setCurrentPresentationId(presentation.id);
    setCurrentSlideIndex(0);
    setCurrentPresentationId(presentation.id);
    setCurrentSlideIndex(0);

  };ePresentation = (id: string) => {

  const deletePresentation = (id: string) => {
      setCurrentPresentationId(null);
      setCurrentSlideIndex(0);
      setCurrentPresentationId(null);
  };

    setDeleteConfirmId(null);on>) => {
    toast.success('Presentation deleted');
      (current || []).map((p) =>
d === id ? { ...p, ...updates, updatedAt: Date.now() } : p
      )
    setPresentations((current) =>
  };

      )
    if (!currentPresentation) return;
  };

      id: `slide-${Date.now()}`,
      title: 'New Slide',

    const newSlide: Slide = {

      title: 'New Slide',
      content: '',currentPresentation.slides, newSlide],
    });

    setCurrentSlideIndex(currentPresentation.slides.length);
      slides: [...currentPresentation.slides, newSlide],
    });

  const updateSlide = (slideId: string, updates: Partial<Slide>) => {
    if (!currentPresentation) return;
  };

      slides: currentPresentation.slides.map((s) =>
    if (!currentPresentation) return;.updates } : s
      ),
    updatePresentation(currentPresentation.id, {
  };
        s.id === slideId ? { ...s, ...updates } : s
      ),
    if (!currentPresentation) return;
  };
ewSlides = currentPresentation.slides.filter((s) => s.id !== slideId);
  const deleteSlide = (slideId: string) => {
    if (!currentPresentation) return;

    const newSlides = currentPresentation.slides.filter((s) => s.id !== slideId);
    updatePresentation(currentPresentation.id, { slides: newSlides });

    if (currentSlideIndex >= newSlides.length) {
  };
    }
  const moveSlide = (fromIndex: number, toIndex: number) => {
    if (!currentPresentation) return;

    const newSlides = [...currentPresentation.slides];

    updatePresentation(currentPresentation.id, { slides: newSlides });
tSlideIndex(toIndex);
  };
    const [movedSlide] = newSlides.splice(fromIndex, 1);
  const startPresentation = () => {
Presentation || currentPresentation.slides.length === 0) {
      toast.error('Add at least one slide to present');
      return;
    setIsPresenting(true);


  if (isPresenting && currentPresentation) {
    return (
      <PresentationViewer
        slides={currentPresentation.slides}
    setIsPresenting(true);heme}
  };
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
        onClose={() => setIsPresenting(false)}
      />uto px-6 py-4">
    );s-center justify-between">
  }ms-center gap-4">

  return (
                  variant="ghost"
                  size="sm"
        <div className="container mx-auto px-6 py-4">
                    setCurrentPresentationId(null);
                    setCurrentSlideIndex(0);
              {currentPresentation && (
                >
                  <ArrowLeft className="mr-2" />
                  Back
                  onClick={() => {
                    setCurrentPresentationId(null);
                    setCurrentSlideIndex(0);
                  }} currentPresentation.title : 'SZMC Presentations'}
                >
                  <ArrowLeft className="mr-2" />

                </Button>
              {currentPresentation ? (
                <>
                  <ThemeSelector
              </h1>
            </div>
resentation(currentPresentation.id, { theme })
            <div className="flex gap-2">
              {currentPresentation ? (
                <>
                  <ThemeSelector
                    currentTheme={currentPresentation.theme}
                    onThemeChange={(theme) =>
                      updatePresentation(currentPresentation.id, { theme })
                    }nt/90">
                    <PresentationIcon className="mr-2" />
                    Present
                  </Button>
                </>
                    Add Slide
                  </Button>
                  <Button onClick={startPresentation} className="bg-accent hover:bg-accent/90">
                    <PresentationIcon className="mr-2" />} />
                  <AIContentGenerator onGenerate={createPresentationFromAI} />
                  <Button onClick={() => setShowNewDialog(true)} className="bg-accent hover:bg-accent/90">
                    <Plus className="mr-2" />
                    New Presentation
                  </Button>
                </>
              )}
                  <AIContentGenerator onGenerate={createPresentationFromAI} />
          </div>
        </div>
      </header>
                  </Button>
                </>-auto px-6 py-8">
        {currentPresentation ? (
          <SlideEditor
            slides={currentPresentation.slides}
            currentSlideIndex={currentSlideIndex}
      </header>lideIndex}

            onDeleteSlide={deleteSlide}
            onMoveSlide={moveSlide}
          />
        ) : (
            currentSlideIndex={currentSlideIndex}
            presentations={presentations || []}
            onSelect={setCurrentPresentationId}
            onDelete={(id) => setDeleteConfirmId(id)}
          />
          />
      </main>

      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
            onSelect={setCurrentPresentationId}
            onDelete={(id) => setDeleteConfirmId(id)}
          />New Presentation</DialogTitle>
            <DialogDescription>
      </main>entation
            </DialogDescription>
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Presentation</DialogTitle>
              value={newPresentationTitle}
              Enter a title for your new presentation
              onKeyDown={(e) => {
          </DialogHeader>
          <div className="py-4">
            <Input
              }}
              autoFocus
              onChange={(e) => setNewPresentationTitle(e.target.value)}
          </div>
          <DialogFooter>
                  createPresentation();ialog(false)}>
              Cancel
            </Button>
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createPresentation} className="bg-accent hover:bg-accent/90">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirmId && deletePresentation(deleteConfirmId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
              onClick={() => deleteConfirmId && deletePresentation(deleteConfirmId)}
    </div>
  );
}

export default App;