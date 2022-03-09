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
  image: string;
}

export interface likeMicropostParams {
  micropostId: number;
}

export interface unlikeMicropostParams {
  micropostId: number;
}

export interface createTeamParams {
  name: string;
  description: string;
  visibilitySetting: string;
  genderRestriction: string;
  autoExitGracePeriod: number;
}

export interface createTeamMessageParams {
  content: string;
}
