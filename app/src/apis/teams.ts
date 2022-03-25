import {createTeamParams} from '@/interfaces/index';
import {getTeamDetailUrl, getTeamDetailListUrl, createTeamUrl, searchTeamsUrl} from '@/urls';
import client from '@/lib/client';

// 取得
export const getTeamDetail = (id: number) => {
  return client.get(getTeamDetailUrl(id));
};

// 一覧
export const getTeamDetailList = () => {
  return client.get(getTeamDetailListUrl);
};

// 作成
export const createTeam = (params: createTeamParams) => {
  return client.post(createTeamUrl, params);
};

// キーワード検索
export const searchTeams = (keyword: string) => {
  return client.get(searchTeamsUrl(keyword));
};
