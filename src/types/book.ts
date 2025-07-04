export type Book = {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  author?: string;
  category: string;
  images: string[];
  created_at: string;
};
