import {baseUrl} from '@/urls';
import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: baseUrl,
  }),
  options
);

export default client;
