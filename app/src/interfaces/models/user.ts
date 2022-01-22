export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  gender: number;
  description: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Profile {
  id: number;
  name: string;
  image?: string;
  email: string;
  gender: string;
  description: string;
  following: boolean;
  friendsCount: number;
  followersCount: number;
}
