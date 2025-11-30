import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkle } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface AISlideEnhancerProps {
  currentTitle: string;
  currentContent: string;
  onEnhance: (title: string, content: string) => void;
}

export function AISlideEnhancer({
  currentTitle,
  currentContent,
  onEnhance,
}: AISlideEnhancerProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhanceSlide = async () => {
    if (!currentTitle.trim() && !currentContent.trim()) {
      toast.error('Please add some content to enhance');
      return;
    }

    setIsEnhancing(true);

    try {
      const prompt = spark.llmPrompt`You are helping to improve a presentation slide.

Current slide:
Title: "${currentTitle}"
Content: "${currentContent}"

Please enhance this slide by:
1. Making the title more engaging and clear (keep it concise)
2. Improving the content to be more professional, well-structured, and impactful
3. Using bullet points where appropriate
4. Ensuring medical/professional terminology is accurate if applicable

Return the result as a valid JSON object with exactly these properties:
{
  "title": "enhanced title here",
  "content": "enhanced content here (use \\n for line breaks)"
}`;

      const result = await spark.llm(prompt, 'gpt-4o', true);
      const parsedResult = JSON.parse(result);

      if (!parsedResult.title || !parsedResult.content) {
        throw new Error('Invalid response format');
      }

      onEnhance(parsedResult.title, parsedResult.content);
      toast.success('Slide enhanced successfully');
    } catch (error) {
      console.error('AI enhancement error:', error);
      toast.error('Failed to enhance slide. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <Button
      onClick={enhanceSlide}
      disabled={isEnhancing}
      variant="outline"
      size="sm"
      className="border-accent/50 text-accent hover:bg-accent/10"
    >
      {isEnhancing ? (
        <>
          <Sparkle className="mr-2 animate-spin" weight="fill" />
          Enhancing...
        </>
      ) : (
        <>
          <Sparkle className="mr-2" weight="fill" />
          AI Enhance
        </>
      )}
    </Button>
  );
}
