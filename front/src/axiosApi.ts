import axios from 'axios';
import { apiUrl } from './globalConstant.ts';

export const axiosApi = axios.create({
  baseURL: apiUrl,
});
