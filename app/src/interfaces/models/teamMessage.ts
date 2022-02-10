export interface TeamMessageItem {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    image?: {
      url: string;
    };
  };
}
