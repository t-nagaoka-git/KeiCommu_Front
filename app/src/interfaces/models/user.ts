export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  gender: number;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}
