export const baseUrl = 'http://localhost:3000/api/v1';

// auth
export const signUpUrl = 'auth';
export const signInUrl = 'auth/sign_in';
export const signOutUrl = 'auth/sign_out';
export const getCurrentUserUrl = 'auth/sessions';
export const editUserUrl = 'auth';

// users
export const getUserUrl = (id) => {
  return `users/${id}`;
};
export const searchUsersUrl = (keyword) => {
  return `users/search?keyword=${keyword}`;
};

// microposts
export const indexMicropostUrl = 'microposts';
export const createMicropostUrl = 'microposts';

// teams
export const getTeamDetailListUrl = 'teams/list';
export const createTeamUrl = 'teams';
export const searchTeamsUrl = (keyword) => {
  return `teams/search?keyword=${keyword}`;
};
