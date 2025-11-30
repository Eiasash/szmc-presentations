import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkle } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface AISlideEnhancerProps {
  currentTitle: string;
  currentContent: string;
  onEnhance: (title: string, content: string) => void;
}

/**
 * Format and enhance slide content with better structure
 */
function formatSlideContent(title: string, content: string): { title: string; content: string } {
  // Clean up the title - capitalize first letter of each word
  const enhancedTitle = title
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Clean up and format content
  let enhancedContent = content.trim();
  
  // If content doesn't have bullet points, try to add them
  if (!enhancedContent.includes('•') && !enhancedContent.includes('-') && !enhancedContent.includes('*')) {
    // Split by periods or newlines and convert to bullet points
    const sentences = enhancedContent
      .split(/[.\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    if (sentences.length > 1) {
      enhancedContent = sentences.map(s => `• ${s}`).join('\n');
    }
  }
  
  // Clean up existing bullet points for consistency
  enhancedContent = enhancedContent
    .replace(/^[-*]\s*/gm, '• ')
    .replace(/\n{3,}/g, '\n\n');

  return { title: enhancedTitle, content: enhancedContent };
}

export function AISlideEnhancer({
  currentTitle,
  currentContent,
  onEnhance,
}: AISlideEnhancerProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhanceSlide = async () => {
    if (!currentTitle.trim() && !currentContent.trim()) {
      toast.error('Please add some content to format');
      return;
    }

    setIsEnhancing(true);

    try {
      // Use built-in formatting instead of AI
      const { title, content } = formatSlideContent(currentTitle, currentContent);
      
      onEnhance(title, content);
      toast.success('Slide formatted successfully');
    } catch (error) {
      console.error('Format error:', error);
      toast.error('Failed to format slide. Please try again.');
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
          Formatting...
        </>
      ) : (
        <>
          <Sparkle className="mr-2" weight="fill" />
          Format
        </>
      )}
    </Button>
  );
}
