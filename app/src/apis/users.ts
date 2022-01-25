import {getUserUrl, searchUsersUrl, getFollowListUrl, getFollowerListUrl} from '@/urls';
import client from '@/lib/client';

// 取得
export const getUser = (id: number) => {
  return client.get(getUserUrl(id));
};

// キーワード検索
export const searchUsers = (keyword: string) => {
  return client.get(searchUsersUrl(keyword));
};

// フォロー一覧取得
export const getFollowList = (id: number) => {
  return client.get(getFollowListUrl(id));
};

// フォロワー一覧取得
export const getFollowerList = (id: number) => {
  return client.get(getFollowerListUrl(id));
};
