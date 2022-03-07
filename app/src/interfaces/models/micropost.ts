export interface MicropostItem {
  id: number;
  content: string;
  image?: {
    url: string;
  };
  liked: boolean;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    name: string;
    image?: {
      url: string;
    };
  };
}
