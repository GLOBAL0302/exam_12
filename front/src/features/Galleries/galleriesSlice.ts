import { IGallery } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createOneGallery, fetchAllGalleries, fetchCertainGalleries } from './galleriesThunk.ts';

interface GalleriesState {
  galleries: IGallery[];
  galleriesLoading: boolean;
  galleriesCreating: boolean;
  galleriesDeleting: boolean;
  galleriesError: boolean | null;
}

const initialState: GalleriesState = {
  galleries: [],
  galleriesLoading: false,
  galleriesCreating: false,
  galleriesDeleting: false,
  galleriesError: null,
};

const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGalleries.pending, (state) => {
        state.galleriesLoading = true;
      })
      .addCase(fetchAllGalleries.fulfilled, (state, { payload }) => {
        state.galleriesLoading = false;
        state.galleries = payload;
      })
      .addCase(fetchAllGalleries.rejected, (state) => {
        state.galleriesLoading = false;
      });

    builder
      .addCase(fetchCertainGalleries.pending, (state) => {
        state.galleriesLoading = true;
      })
      .addCase(fetchCertainGalleries.fulfilled, (state, { payload }) => {
        state.galleriesLoading = false;
        state.galleries = payload;
      })
      .addCase(fetchCertainGalleries.rejected, (state) => {
        state.galleriesLoading = false;
      });

    builder
      .addCase(createOneGallery.pending, (state) => {
        state.galleriesCreating = true;
      })
      .addCase(createOneGallery.fulfilled, (state) => {
        state.galleriesCreating = false;
      })
      .addCase(createOneGallery.rejected, (state) => {
        state.galleriesCreating = false;
      });
  },
  selectors: {
    selectGalleries: (state) => state.galleries,
    selectGalleriesLoading: (state) => state.galleriesLoading,
    selectGalleriesCreating: (state) => state.galleriesCreating,
    selectGalleriesDeleting: (state) => state.galleriesDeleting,
    selectGalleriesError: (state) => state.galleriesError,
  },
});

export const galleriesReducer = galleriesSlice.reducer;
export const {
  selectGalleries,
  selectGalleriesDeleting,
  selectGalleriesLoading,
  selectGalleriesError,
  selectGalleriesCreating,
} = galleriesSlice.selectors;
