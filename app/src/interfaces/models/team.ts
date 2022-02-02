export interface Team {
  id: number;
  name: string;
  description: string;
  visibilitySetting: string;
  genderRestriction: string;
  autoExitGracePeriod: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamItem {
  id: number;
  name: string;
  description: string;
  visibilitySetting: string;
  genderRestriction: string;
  autoExitGracePeriod: number;
  createdAt: Date;
  updatedAt: Date;
  users: {
    id: number;
    name: string;
    image?: {
      url: string;
    };
  }[];
}
