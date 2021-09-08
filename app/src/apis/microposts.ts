import {createMicropostParams} from '@/interfaces/index';
import {createMicropostURL} from '@/urls';
import client from '@/lib/client';

// 投稿
export const createMicropost = (userId: number, params: createMicropostParams) => {
  return client.post(createMicropostURL(userId), params);
};
