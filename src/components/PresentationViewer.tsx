import { useState, useEffect } from 'react';
import { Slide, PresentationTheme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTheme } from '@/lib/themes';

interface PresentationViewerProps {
  slides: Slide[];
  theme?: PresentationTheme;
  onClose: () => void;
}

export function PresentationViewer({ slides, theme, onClose }: PresentationViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const themeConfig = getTheme(theme);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, slides.length]);

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentSlide = slides[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: themeConfig.background }}>
      <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
        <span className="font-medium" style={{ color: themeConfig.textColor, opacity: 0.7 }}>
          {currentIndex + 1} / {slides.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          style={{ color: themeConfig.textColor }}
          className="hover:bg-white/10"
        >
          <X size={24} />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-16 py-12 overflow-auto">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'tween', duration: 0.3 },
                opacity: { duration: 0.2 },
              }}
              style={{ color: themeConfig.textColor }}
              className="relative"
            >
              {currentSlide.imageUrl && currentSlide.imagePosition === 'background' && (
                <div
                  className="absolute inset-0 opacity-20 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
                />
              )}

              <div className={`relative z-10 ${
                currentSlide.imagePosition === 'left' || currentSlide.imagePosition === 'right'
                  ? 'flex gap-8 items-start'
                  : ''
              }`}>
                {currentSlide.imageUrl && currentSlide.imagePosition === 'top' && (
                  <div className="mb-8">
                    <img
                      src={currentSlide.imageUrl}
                      alt={currentSlide.title}
                      className="max-h-64 mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {currentSlide.imageUrl && currentSlide.imagePosition === 'left' && (
                  <div className="flex-shrink-0">
                    <img
                      src={currentSlide.imageUrl}
                      alt={currentSlide.title}
                      className="max-w-md rounded-lg shadow-lg"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                    {currentSlide.title}
                  </h1>
                  <div className="text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap">
                    {currentSlide.content}
                  </div>
                </div>

                {currentSlide.imageUrl && currentSlide.imagePosition === 'right' && (
                  <div className="flex-shrink-0">
                    <img
                      src={currentSlide.imageUrl}
                      alt={currentSlide.title}
                      className="max-w-md rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>

              {currentSlide.imageUrl && currentSlide.imagePosition === 'bottom' && (
                <div className="mt-8">
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    className="max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pb-8">
        <Button
          variant="secondary"
          size="lg"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: themeConfig.textColor,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
          className="hover:bg-white/20"
        >
          <ArrowLeft className="mr-2" />
          Previous
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={goToNext}
          disabled={currentIndex === slides.length - 1}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: themeConfig.textColor,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
          className="hover:bg-white/20"
        >
          Next
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
