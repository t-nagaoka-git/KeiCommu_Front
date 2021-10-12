export interface Micropost {
  id: number;
  content: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface MicropostItem {
  id: number;
  content: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    name: string;
    image: string;
  };
}