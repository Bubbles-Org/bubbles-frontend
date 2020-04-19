import axios from 'axios';
import { getToken } from './auth';

let token;

const handleError = error => {
  console.log(error);
};

const requestHandler = config => {
  token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
};

const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const Api = axios.create({ baseURL: serverUrl });

Api.interceptors.request.use(requestHandler);

Api.interceptors.response.use(
  res => res,
  error => {
    handleError(error);
    return Promise.reject(error);
  }
);

export default Api;
