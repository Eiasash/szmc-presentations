import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Presentation, Slide } from '@/lib/types';
import { PresentationList } from '@/components/PresentationList';
import { SlideEditor } from '@/components/SlideEditor';
import { PresentationViewer } from '@/components/PresentationViewer';
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

  const deletePresentation = (id: string) => {
    setPresentations((current) => (current || []).filter((p) => p.id !== id));
    if (currentPresentationId === id) {
      setCurrentPresentationId(null);
      setCurrentSlideIndex(0);
    }
    setDeleteConfirmId(null);
    toast.success('Presentation deleted');
  };

  const updatePresentation = (id: string, updates: Partial<Presentation>) => {
    setPresentations((current) =>
      (current || []).map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
      )
    );
  };

  const addSlide = () => {
    if (!currentPresentation) return;

    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: 'New Slide',
      content: '',
    };

    updatePresentation(currentPresentation.id, {
      slides: [...currentPresentation.slides, newSlide],
    });

    setCurrentSlideIndex(currentPresentation.slides.length);
    toast.success('Slide added');
  };

  const updateSlide = (slideId: string, updates: Partial<Slide>) => {
    if (!currentPresentation) return;

    updatePresentation(currentPresentation.id, {
      slides: currentPresentation.slides.map((s) =>
        s.id === slideId ? { ...s, ...updates } : s
      ),
    });
  };

  const deleteSlide = (slideId: string) => {
    if (!currentPresentation) return;

    const newSlides = currentPresentation.slides.filter((s) => s.id !== slideId);
    updatePresentation(currentPresentation.id, { slides: newSlides });

    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(Math.max(0, newSlides.length - 1));
    }

    toast.success('Slide deleted');
  };

  const moveSlide = (fromIndex: number, toIndex: number) => {
    if (!currentPresentation) return;

    const newSlides = [...currentPresentation.slides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);

    updatePresentation(currentPresentation.id, { slides: newSlides });
    setCurrentSlideIndex(toIndex);
  };

  const startPresentation = () => {
    if (!currentPresentation || currentPresentation.slides.length === 0) {
      toast.error('Add at least one slide to present');
      return;
    }
    setIsPresenting(true);
  };

  if (isPresenting && currentPresentation) {
    return (
      <PresentationViewer
        slides={currentPresentation.slides}
        onClose={() => setIsPresenting(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentPresentation && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCurrentPresentationId(null);
                    setCurrentSlideIndex(0);
                  }}
                >
                  <ArrowLeft className="mr-2" />
                  Back
                </Button>
              )}
              <h1 className="text-2xl md:text-3xl font-semibold">
                {currentPresentation ? currentPresentation.title : 'SZMC Presentations'}
              </h1>
            </div>

            <div className="flex gap-2">
              {currentPresentation ? (
                <>
                  <Button onClick={addSlide} variant="outline">
                    <Plus className="mr-2" />
                    Add Slide
                  </Button>
                  <Button onClick={startPresentation} className="bg-accent hover:bg-accent/90">
                    <PresentationIcon className="mr-2" />
                    Present
                  </Button>
                </>
              ) : (
                <Button onClick={() => setShowNewDialog(true)} className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2" />
                  New Presentation
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {currentPresentation ? (
          <SlideEditor
            slides={currentPresentation.slides}
            currentSlideIndex={currentSlideIndex}
            onSlideChange={setCurrentSlideIndex}
            onUpdateSlide={updateSlide}
            onDeleteSlide={deleteSlide}
            onMoveSlide={moveSlide}
          />
        ) : (
          <PresentationList
            presentations={presentations || []}
            onSelect={setCurrentPresentationId}
            onDelete={(id) => setDeleteConfirmId(id)}
          />
        )}
      </main>

      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Presentation</DialogTitle>
            <DialogDescription>
              Enter a title for your new presentation
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Presentation title..."
              value={newPresentationTitle}
              onChange={(e) => setNewPresentationTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createPresentation();
                }
              }}
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
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Presentation?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the presentation and all
              its slides.
            </AlertDialogDescription>
          </AlertDialogHeader>
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
      </AlertDialog>
    </div>
  );
}

export default App;