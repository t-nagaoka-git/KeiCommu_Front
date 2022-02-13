import {getTeamMessageListUrl, createTeamMessageUrl} from '@/urls';
import {createTeamMessageParams} from '@/interfaces';
import client from '@/lib/client';

// 一覧
export const getTeamMessageList = (id: number) => {
  return client.get(getTeamMessageListUrl(id));
};

// 送信
export const createTeamMessage = (id: number, params: createTeamMessageParams) => {
  return client.post(createTeamMessageUrl(id), params);
};
