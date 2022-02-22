import {joinTeamUrl} from '@/urls';
import client from '@/lib/client';

// 参加
export const joinTeam = (teamId: number) => {
  return client.post(joinTeamUrl(teamId));
};
