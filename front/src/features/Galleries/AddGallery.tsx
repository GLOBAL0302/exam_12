import { Box, Button, Container, Grid2, TextField } from '@mui/material';
import { useState } from 'react';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { createOneGallery } from './galleriesThunk.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  image: '',
};

const addGallery = () => {
  const [galleryForm, setGalleryForm] = useState(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGalleryForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setGalleryForm((prevState) => ({ ...prevState, [name]: files[0] }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(galleryForm);
    await dispatch(createOneGallery(galleryForm)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid2 container direction={'column'} gap={2} component="form" onSubmit={onSubmit}>
          <Grid2>
            <TextField fullWidth label="Title" id="title" name="title" onChange={handleEventChange} />
          </Grid2>
          <Grid2>
            <FileInput name="image" label="image" onGetFile={onChangeFile} />
          </Grid2>
          <Grid2>
            <Button variant="contained" color="success" type="submit">
              Create Photo
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default addGallery;
