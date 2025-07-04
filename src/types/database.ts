export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          condition: string;
          category: string;
          images: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          price: number;
          condition: string;
          category: string;
          images: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price?: number;
          condition?: string;
          category?: string;
          images?: string[];
          created_at?: string;
        };
      };
    };
  };
};
