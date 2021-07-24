import {postsIndexUrl} from '@/urls';
import client from '@/lib/client';

// 一覧取得
export const postsIndex = () => {
  return client
    .get(postsIndexUrl)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
};
