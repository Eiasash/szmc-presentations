import { useState, useEffect } from 'react';
import { Slide } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresentationViewerProps {
  slides: Slide[];
  onClose: () => void;
}

export function PresentationViewer({ slides, onClose }: PresentationViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
        <span className="text-white/70 text-sm font-medium">
          {currentIndex + 1} / {slides.length}
        </span>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
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
              className="text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                {currentSlide.title}
              </h1>
              <div className="text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap">
                {currentSlide.content}
              </div>
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
          className="bg-white/10 hover:bg-white/20 text-white border-white/20"
        >
          <ArrowLeft className="mr-2" />
          Previous
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={goToNext}
          disabled={currentIndex === slides.length - 1}
          className="bg-white/10 hover:bg-white/20 text-white border-white/20"
        >
          Next
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
