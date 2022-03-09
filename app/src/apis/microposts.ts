import {indexMicropostUrl, getTimelineUrl, createMicropostUrl, likeMicropostUrl, unlikeMicropostUrl} from '@/urls';
import client from '@/lib/client';
import {likeMicropostParams, unlikeMicropostParams} from '@/interfaces';

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

// いいね
export const likeMicropost = (params: likeMicropostParams) => {
  return client.post(likeMicropostUrl(params.micropostId), params);
};

// いいね解除
export const unlikeMicropost = (params: unlikeMicropostParams) => {
  return client.post(unlikeMicropostUrl(params.micropostId), params);
};
