import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGallery, IGalleryMutation, IValidationError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';

export const fetchCertainGalleries = createAsyncThunk<IGallery[], string>(
  'Galleries/fetchCertainGalleries',
  async (userId) => {
    let response;
    response = await axiosApi.get(`/galleries?id=${userId}`);

    return response.data;
  },
);

export const fetchAllGalleries = createAsyncThunk<IGallery[]>('Galleries/fetchAllGalleries', async () => {
  let response;
  response = await axiosApi.get('/galleries');
  return response.data;
});

export const createOneGallery = createAsyncThunk<void, IGalleryMutation, { rejectValue: IValidationError }>(
  'Galleries/createOneGallery',
  async (gallery, { rejectWithValue }) => {
    try {
      const dataForm = new FormData();
      const keys = Object.keys(gallery) as (keyof typeof gallery)[];
      keys.forEach((key) => {
        if (gallery[key]) {
          dataForm.append(key, gallery[key]);
        }
      });
      const response = await axiosApi.post('/galleries', dataForm);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
