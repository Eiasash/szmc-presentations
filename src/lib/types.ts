export interface Slide {
  id: string;
  title: string;
  content: string;
}

export interface Presentation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  slides: Slide[];
}
