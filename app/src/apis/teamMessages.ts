import {getTeamMessageListUrl} from '@/urls';
import client from '@/lib/client';

// 一覧
export const getTeamMessageList = (id: number) => {
  return client.get(getTeamMessageListUrl(id));
};
