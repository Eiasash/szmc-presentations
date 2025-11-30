import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Image, Trash, Link as LinkIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { readFileAsDataURL } from '@/lib/importUtils';

interface ImageUploaderProps {
  currentImageUrl?: string;
  currentImagePosition?: 'top' | 'bottom' | 'left' | 'right' | 'background';
  onImageChange: (imageUrl: string | undefined, position: 'top' | 'bottom' | 'left' | 'right' | 'background') => void;
}

export function ImageUploader({ currentImageUrl, currentImagePosition = 'top', onImageChange }: ImageUploaderProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePosition, setImagePosition] = useState<'top' | 'bottom' | 'left' | 'right' | 'background'>(currentImagePosition);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const dataUrl = await readFileAsDataURL(file);
      setImageUrl(dataUrl);
      toast.success('Image loaded');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to load image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSave = () => {
    if (imageUrl.trim()) {
      onImageChange(imageUrl, imagePosition);
      toast.success('Image added to slide');
    } else {
      toast.error('Please provide an image');
    }
    setShowDialog(false);
  };

  const handleRemove = () => {
    onImageChange(undefined, 'top');
    toast.success('Image removed from slide');
  };

  const openDialog = () => {
    setImageUrl(currentImageUrl || '');
    setImagePosition(currentImagePosition);
    setShowDialog(true);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={openDialog}
        >
          <Image className="mr-2" />
          {currentImageUrl ? 'Edit Image' : 'Add Image'}
        </Button>
        {currentImageUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemove}
          >
            <Trash />
          </Button>
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Image to Slide</DialogTitle>
            <DialogDescription>
              Upload an image or provide a URL to add visuals to your slide
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full"
              >
                <Image className="mr-2" />
                {isUploading ? 'Loading...' : 'Choose Image File'}
              </Button>
              <p className="text-sm text-muted-foreground">
                Supported formats: JPG, PNG, GIF, WebP (max 5MB)
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t" />
              <span className="text-sm text-muted-foreground">OR</span>
              <div className="flex-1 border-t" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex gap-2">
                <LinkIcon className="mt-2.5 text-muted-foreground" />
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>

            {imageUrl && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-lg p-4 bg-muted/50">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded"
                    onError={() => toast.error('Failed to load image from URL')}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="image-position">Image Position</Label>
              <Select value={imagePosition} onValueChange={(value: any) => setImagePosition(value)}>
                <SelectTrigger id="image-position">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top of slide</SelectItem>
                  <SelectItem value="bottom">Bottom of slide</SelectItem>
                  <SelectItem value="left">Left side</SelectItem>
                  <SelectItem value="right">Right side</SelectItem>
                  <SelectItem value="background">Background</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!imageUrl.trim()} className="bg-accent hover:bg-accent/90">
              Add Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
