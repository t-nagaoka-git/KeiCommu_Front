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

export interface editUserParams {
  name: string;
  email: string;
  description: string;
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
