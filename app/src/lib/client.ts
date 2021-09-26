import axios from 'axios';
import {baseUrl} from '@/urls';
import applyCaseMiddleware from 'axios-case-converter';

const options = {
  ignoreHeaders: true,
};

const getStorage = () => {
  return window.localStorage;
};

const authHeaderKeys = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

const getVerificationParams = () => {
  const result = {};
  const storage = getStorage();
  authHeaderKeys.forEach((key: string) => {
    if (storage.getItem(key)) result[key] = storage.getItem(key);
  });
  return result;
};

const saveHeaders = (response) => {
  if (response && response.headers) {
    const storage = getStorage();
    authHeaderKeys.forEach((key: string) => {
      if (response.headers[key]) {
        storage.setItem(key, response.headers[key]);
        axios.defaults.headers.common[key] = response.headers[key];
      }
    });
  }
};

const instance = axios.create({
  baseURL: baseUrl,
});
instance.interceptors.request.use(
  (request) => {
    const verificationParams = getVerificationParams();
    request.headers = {...verificationParams};
    console.log('Starting Request: ', request);
    return request;
  },
  function (error) {
    console.log('Request Error: ', error.response);
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    console.log('Response: ', response);
    saveHeaders(response);
    return response;
  },
  function (error) {
    console.log('Response Error: ', error.response);
    saveHeaders(error.response);
    return Promise.reject(error);
  }
);

const client = applyCaseMiddleware(instance, options);

export default client;
