import {createMicropostParams} from '@/interfaces/index';
import {indexMicropostUrl, createMicropostUrl} from '@/urls';
import client from '@/lib/client';

// 一覧
export const indexMicropost = () => {
  return client.get(indexMicropostUrl);
};

// 投稿
export const createMicropost = (params: createMicropostParams) => {
  return client.post(createMicropostUrl, params);
};
