import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiUrl } from './globalConstant.ts';
import { RootState } from './store/app.ts';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users?.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);
    return config;
  });
};

export default axiosApi;
