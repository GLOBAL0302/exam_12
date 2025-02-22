import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectUser } from '../Users/usersSlice.ts';
import { Button, CircularProgress, Grid2, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllGalleries, fetchCertainGalleries } from './galleriesThunk.ts';
import { selectGalleries, selectGalleriesLoading } from './galleriesSlice.ts';
import Gallery from './Gallery.tsx';

const Galleries = () => {
  const user = useAppSelector(selectUser);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const galleriesLoading = useAppSelector(selectGalleriesLoading);
  const galleries = useAppSelector(selectGalleries);

  const getAllGalleries = useCallback(async () => {
    if (userId) {
      await dispatch(fetchCertainGalleries(userId));
    } else {
      await dispatch(fetchAllGalleries());
    }
  }, [userId]);

  useEffect(() => {
    void getAllGalleries();
  }, [getAllGalleries, userId]);

  return (
    <Grid2>
      {user?._id == userId && (
        <Grid2 container>
          <Grid2>
            <Typography variant="h5" component="div">
              {user?.displayName.toUpperCase()}'s Gallery
            </Typography>
          </Grid2>
          <Grid2 marginLeft="auto">
            <Button
              onClick={() => navigate('/addGallery')}
              variant="outlined"
              color="success"
              endIcon={<AddPhotoAlternateIcon />}
            >
              Add New Photo
            </Button>
          </Grid2>
        </Grid2>
      )}

      {galleriesLoading ? (
        <CircularProgress />
      ) : (
        <Grid2 container spacing={2}>
          {galleries.map((gallery) => (
            <Gallery key={gallery._id} gallery={gallery} />
          ))}
        </Grid2>
      )}
    </Grid2>
  );
};

export default Galleries;
