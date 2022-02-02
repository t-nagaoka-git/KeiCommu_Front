import {signUpUrl, signInUrl, signOutUrl, getCurrentUserUrl, editUserUrl} from '@/urls';
import client from '@/lib/client';
import Cookies from 'js-cookie';
import {SignUpParams, SignInParams} from '@/interfaces/index';

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post(signUpUrl, params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return client.post(signInUrl, params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete(signOutUrl, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

// 認証済みユーザー取得
export const getCurrentUser = () => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return;
  return client.get(getCurrentUserUrl, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

// ユーザー編集
export const editUser = (params: FormData) => {
  return client.patch(editUserUrl, params);
};
