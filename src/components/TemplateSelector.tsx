import { useState } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES, getTemplatesByCategory, PresentationTemplate } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  FirstAid,
  ChartLineUp,
  GraduationCap,
  Files,
  Briefcase,
  Users,
  FolderOpen,
  PresentationChart,
  MagnifyingGlass,
  Heartbeat,
} from '@phosphor-icons/react';

const iconMap: Record<string, React.ComponentType<any>> = {
  FirstAid,
  ChartLineUp,
  GraduationCap,
  Files,
  Briefcase,
  Users,
  FolderOpen,
  PresentationChart,
  MagnifyingGlass,
  Heartbeat,
  File: FileText,
};

interface TemplateSelectorProps {
  onSelectTemplate: (template: PresentationTemplate, title: string) => void;
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PresentationTemplate | null>(null);
  const [presentationTitle, setPresentationTitle] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleTemplateSelect = (template: PresentationTemplate) => {
    setSelectedTemplate(template);
    setPresentationTitle(template.name);
  };

  const handleCreate = () => {
    if (selectedTemplate && presentationTitle.trim()) {
      onSelectTemplate(selectedTemplate, presentationTitle);
      setOpen(false);
      setSelectedTemplate(null);
      setPresentationTitle('');
      setActiveCategory('all');
    }
  };

  const getFilteredTemplates = () => {
    if (activeCategory === 'all') return TEMPLATES;
    return getTemplatesByCategory(activeCategory as any);
  };

  const CategoryIcon = ({ name }: { name: string }) => {
    const Icon = iconMap[name] || Files;
    return <Icon className="w-4 h-4" />;
  };

  const TemplateIcon = ({ name }: { name: string }) => {
    const Icon = iconMap[name] || FileText;
    return <Icon className="w-5 h-5" weight="duotone" />;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="mr-2" />
          From Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Start with a pre-built template for common presentation types
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            {TEMPLATE_CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="gap-2">
                <CategoryIcon name={category.icon} />
                <span className="hidden md:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <ScrollArea className="h-[400px] mt-4 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredTemplates().map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-md hover:border-primary/50 ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary border-2 shadow-md'
                      : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <TemplateIcon name={template.icon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{template.slides.length} slides</span>
                      <span className="capitalize">{template.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Tabs>

        {selectedTemplate && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <label htmlFor="presentation-title" className="text-sm font-medium">
                Presentation Title
              </label>
              <Input
                id="presentation-title"
                placeholder="Enter a title for your presentation"
                value={presentationTitle}
                onChange={(e) => setPresentationTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreate();
                  }
                }}
                className="mt-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Back
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!presentationTitle.trim()}
                className="bg-accent hover:bg-accent/90"
              >
                Create Presentation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
