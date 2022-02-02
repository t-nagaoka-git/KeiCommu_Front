export interface User {
  id: number;
  name: string;
  image?: {
    url: string;
  };
  email: string;
  gender: number;
  description: string;
  following: boolean;
}

export interface Profile {
  id: number;
  name: string;
  image?: {
    url: string;
  };
  email: string;
  gender: string;
  description: string;
  following: boolean;
  friendsCount: number;
  followersCount: number;
}
