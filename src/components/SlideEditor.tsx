import { Slide } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash, CaretUp, CaretDown } from '@phosphor-icons/react';
import { AISlideEnhancer } from '@/components/AISlideEnhancer';
import { ImageUploader } from '@/components/ImageUploader';

interface SlideEditorProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  onUpdateSlide: (id: string, updates: Partial<Slide>) => void;
  onDeleteSlide: (id: string) => void;
  onMoveSlide: (fromIndex: number, toIndex: number) => void;
}

export function SlideEditor({
  slides,
  currentSlideIndex,
  onSlideChange,
  onUpdateSlide,
  onDeleteSlide,
  onMoveSlide,
}: SlideEditorProps) {
  const currentSlide = slides[currentSlideIndex];

  if (!currentSlide) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No slide selected
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-full">
      <div className="w-64 flex-shrink-0 overflow-y-auto">
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <Card
              key={slide.id}
              className={`p-3 cursor-pointer transition-all ${
                index === currentSlideIndex
                  ? 'border-l-4 border-l-accent bg-accent/5'
                  : 'hover:bg-secondary'
              }`}
              onClick={() => onSlideChange(index)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-1 truncate">{slide.title || 'Untitled'}</p>
                  <p className="text-xs text-muted-foreground">Slide {index + 1}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (index > 0) onMoveSlide(index, index - 1);
                    }}
                    disabled={index === 0}
                  >
                    <CaretUp size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (index < slides.length - 1) onMoveSlide(index, index + 1);
                    }}
                    disabled={index === slides.length - 1}
                  >
                    <CaretDown size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Edit Slide {currentSlideIndex + 1}</h2>
              <AISlideEnhancer
                currentTitle={currentSlide.title}
                currentContent={currentSlide.content}
                onEnhance={(title, content) => {
                  onUpdateSlide(currentSlide.id, { title, content });
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Slide Title</label>
              <Input
                value={currentSlide.title}
                onChange={(e) => onUpdateSlide(currentSlide.id, { title: e.target.value })}
                placeholder="Enter slide title..."
                className="text-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Slide Content</label>
              <Textarea
                value={currentSlide.content}
                onChange={(e) => onUpdateSlide(currentSlide.id, { content: e.target.value })}
                placeholder="Enter slide content..."
                className="min-h-[400px] resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Slide Image</label>
              <ImageUploader
                currentImageUrl={currentSlide.imageUrl}
                currentImagePosition={currentSlide.imagePosition}
                onImageChange={(imageUrl, imagePosition) => {
                  onUpdateSlide(currentSlide.id, { imageUrl, imagePosition });
                }}
              />
              {currentSlide.imageUrl && (
                <div className="mt-3 border rounded-lg p-3 bg-muted/50">
                  <img
                    src={currentSlide.imageUrl}
                    alt="Slide preview"
                    className="max-h-40 mx-auto rounded"
                  />
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Position: {currentSlide.imagePosition || 'top'}
                  </p>
                </div>
              )}
            </div>

            {slides.length > 1 && (
              <div className="pt-4 border-t">
                <Button
                  variant="destructive"
                  onClick={() => onDeleteSlide(currentSlide.id)}
                  className="w-full"
                >
                  <Trash className="mr-2" />
                  Delete Slide
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
