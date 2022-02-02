export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface createRelationshipParams {
  followed_id: number;
}

export interface destroyRelationshipParams {
  followed_id: number;
}

export interface createMicropostParams {
  content: string;
}

export interface createTeamParams {
  name: string;
  description: string;
  visibilitySetting: string;
  genderRestriction: string;
  autoExitGracePeriod: number;
}
