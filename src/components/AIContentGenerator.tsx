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

/**
 * Generate presentation slides based on a topic
 * Creates a structured outline with introduction, main points, and conclusion
 */
function generatePresentationOutline(topic: string, numSlides: number): Slide[] {
  const slides: Slide[] = [];
  const topicWords = topic.trim();
  const baseTimestamp = Date.now();
  
  // Title/Introduction slide
  slides.push({
    id: `slide-${baseTimestamp}-0`,
    title: topicWords,
    content: `Welcome to this presentation on ${topicWords}.\n\n• Overview of key concepts\n• Important considerations\n• Practical applications`,
  });

  // Calculate how many content slides we need (excluding intro and conclusion)
  const contentSlideCount = Math.max(1, numSlides - 2);
  
  // Generate content slide titles based on common presentation structure
  const contentTitles = [
    'Background & Context',
    'Key Concepts',
    'Main Findings',
    'Clinical Implications',
    'Best Practices',
    'Case Studies',
    'Evidence & Research',
    'Implementation',
    'Challenges & Solutions',
    'Future Directions',
    'Discussion Points',
    'Practical Applications',
    'Guidelines & Protocols',
    'Risk Factors',
    'Prevention Strategies',
    'Treatment Options',
    'Patient Outcomes',
    'Quality Measures',
  ];

  // Add content slides
  for (let i = 0; i < contentSlideCount && i < contentTitles.length; i++) {
    slides.push({
      id: `slide-${baseTimestamp}-${i + 1}`,
      title: contentTitles[i],
      content: `Key points about ${contentTitles[i].toLowerCase()} related to ${topicWords}:\n\n• Point 1: Add your content here\n• Point 2: Add your content here\n• Point 3: Add your content here\n\nNotes: Customize this slide with specific information.`,
    });
  }

  // Conclusion slide (only if we have room)
  if (numSlides >= 2) {
    slides.push({
      id: `slide-${baseTimestamp}-${slides.length}`,
      title: 'Summary & Conclusions',
      content: `Key takeaways from this presentation on ${topicWords}:\n\n• Main point 1\n• Main point 2\n• Main point 3\n\nThank you for your attention!\n\nQuestions?`,
    });
  }

  // Ensure we don't exceed the requested number of slides
  return slides.slice(0, numSlides);
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
      // Generate slides using our built-in template generator
      const slides = generatePresentationOutline(topic, numSlides);

      if (slides.length === 0) {
        throw new Error('No slides generated');
      }

      onGenerate(slides);
      setOpen(false);
      setTopic('');
      setSlideCount('5');
      toast.success(`Generated ${slides.length} slides - customize them with your content!`);
    } catch (error) {
      console.error('Generation error:', error);
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
        Quick Generate
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkle weight="fill" className="text-accent" />
              Quick Outline Generator
            </DialogTitle>
            <DialogDescription>
              Generate a presentation outline based on your topic. Enter your topic and we'll create a structured template with slides you can customize.
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
