export const baseUrl = 'http://localhost:3000/api/v1';
export const cableUrl = 'http://localhost:3000/cable';

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
export const getFollowListUrl = (id) => {
  return `users/${id}/following`;
};
export const getFollowerListUrl = (id) => {
  return `users/${id}/followers`;
};

// relationships
export const createRelationshipUrl = 'relationships/create';
export const destroyRelationshipUrl = 'relationships/destroy';

// microposts
export const indexMicropostUrl = 'microposts';
export const getTimelineUrl = 'microposts/timeline';
export const createMicropostUrl = 'microposts';

// teams
export const getTeamDetailListUrl = 'teams/list';
export const createTeamUrl = 'teams';
export const searchTeamsUrl = (keyword) => {
  return `teams/search?keyword=${keyword}`;
};

// teamMessages
export const getTeamMessageListUrl = (id) => {
  return `teams/${id}/team_messages`;
};
export const createTeamMessageUrl = (id) => {
  return `teams/${id}/team_messages`;
};
