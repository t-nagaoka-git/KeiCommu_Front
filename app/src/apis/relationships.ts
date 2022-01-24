import {createRelationshipParams, destroyRelationshipParams} from '@/interfaces/index';
import {createRelationshipUrl, destroyRelationshipUrl} from '@/urls';
import client from '@/lib/client';

// フォロー
export const createRelationship = (params: createRelationshipParams) => {
  return client.post(createRelationshipUrl, params);
};

// フォロー解除
export const destroyRelationship = (params: destroyRelationshipParams) => {
  return client.post(destroyRelationshipUrl, params);
};
