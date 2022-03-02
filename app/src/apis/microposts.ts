import {createMicropostParams} from '@/interfaces/index';
import {indexMicropostUrl, getTimelineUrl, createMicropostUrl} from '@/urls';
import client from '@/lib/client';

// 一覧
export const indexMicropost = () => {
  return client.get(indexMicropostUrl);
};

// タイムライン
export const getTimeline = () => {
  return client.get(getTimelineUrl);
};

// 投稿
export const createMicropost = (params: FormData) => {
  return client.post(createMicropostUrl, params);
};
