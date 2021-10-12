import {getUserUrl, searchUsersUrl} from '@/urls';
import client from '@/lib/client';

// 取得
export const getUser = (id: number) => {
  return client.get(getUserUrl(id));
};

// キーワード検索
export const searchUsers = (keyword: string) => {
  return client.get(searchUsersUrl(keyword));
};
