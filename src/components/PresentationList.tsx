import { Presentation } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, Presentation as PresentationIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface PresentationListProps {
  presentations: Presentation[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PresentationList({ presentations, onSelect, onDelete }: PresentationListProps) {
  if (presentations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <PresentationIcon size={64} className="text-muted-foreground mb-4" weight="thin" />
        <h2 className="text-2xl font-semibold mb-2">No presentations yet</h2>
        <p className="text-muted-foreground text-center">
          Create your first presentation to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {presentations.map((presentation) => (
        <motion.div
          key={presentation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div onClick={() => onSelect(presentation.id)}>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {presentation.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {presentation.slides.length} slide{presentation.slides.length !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-muted-foreground">
                Updated {new Date(presentation.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelect(presentation.id)}
                className="flex-1"
              >
                <Pencil className="mr-2" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(presentation.id);
                }}
                className="text-destructive hover:text-destructive"
              >
                <Trash />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
