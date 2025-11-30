import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sparkle, PlusCircle } from '@phosphor-icons/react';
import { Slide } from '@/lib/types';
import { toast } from 'sonner';

interface AIContentGeneratorProps {
  onGenerate: (slides: Slide[]) => void;
}

export function AIContentGenerator({ onGenerate }: AIContentGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState('5');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    const numSlides = parseInt(slideCount, 10);
    if (isNaN(numSlides) || numSlides < 1 || numSlides > 20) {
      toast.error('Please enter a number between 1 and 20');
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = spark.llmPrompt`You are creating a professional presentation about "${topic}".

Generate exactly ${numSlides} slides for this presentation. Each slide should have:
- A clear, concise title
- Content that is informative and well-structured (2-4 bullet points or short paragraphs)

Return the result as a valid JSON object with a single property called "slides" that contains an array of slide objects.
Each slide object should have exactly these properties:
- title: string (the slide title)
- content: string (the slide content, use \n for line breaks)

Format your response as:
{
  "slides": [
    {"title": "Introduction", "content": "Overview of the topic\n• Key point 1\n• Key point 2"},
    ...more slides
  ]
}`;

      const result = await spark.llm(prompt, 'gpt-4o', true);
      const parsedResult = JSON.parse(result);

      if (!parsedResult.slides || !Array.isArray(parsedResult.slides)) {
        throw new Error('Invalid response format');
      }

      const slides: Slide[] = parsedResult.slides.map((slide: { title: string; content: string }, index: number) => ({
        id: `slide-${Date.now()}-${index}`,
        title: slide.title || `Slide ${index + 1}`,
        content: slide.content || '',
      }));

      if (slides.length === 0) {
        throw new Error('No slides generated');
      }

      onGenerate(slides);
      setOpen(false);
      setTopic('');
      setSlideCount('5');
      toast.success(`Generated ${slides.length} slides`);
    } catch (error) {
      console.error('AI generation error:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="border-accent/50 text-accent hover:bg-accent/10"
      >
        <Sparkle className="mr-2" weight="fill" />
        AI Generate
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkle weight="fill" className="text-accent" />
              AI Content Generator
            </DialogTitle>
            <DialogDescription>
              Let AI create a presentation outline for you. Describe your topic and we'll generate slides.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Topic</label>
              <Textarea
                placeholder="E.g., The importance of hand hygiene in healthcare settings"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="min-h-[100px]"
                disabled={isGenerating}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Number of Slides (1-20)</label>
              <Input
                type="number"
                min="1"
                max="20"
                value={slideCount}
                onChange={(e) => setSlideCount(e.target.value)}
                disabled={isGenerating}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              onClick={generateContent}
              disabled={isGenerating}
              className="bg-accent hover:bg-accent/90"
            >
              {isGenerating ? (
                <>
                  <Sparkle className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2" />
                  Generate Slides
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
