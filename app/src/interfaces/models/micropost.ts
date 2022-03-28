export interface MicropostItem {
  id: number;
  content: string;
  image?: {
    url: string;
  };
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
    image?: {
      url: string;
    };
  };
}
