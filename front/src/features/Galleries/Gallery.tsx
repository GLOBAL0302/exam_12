import { IGallery } from '../../types';
import { apiUrl } from '../../globalConstant.ts';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks.ts';
import { selectUser } from '../Users/usersSlice.ts';

interface Props {
  gallery: IGallery;
}

const Gallery: React.FC<Props> = ({ gallery }) => {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let pic = '';
  if (gallery.image) {
    pic = apiUrl + '/' + gallery.image;
  }

  return (
    <Grid2
      sx={{
        border: '2px solid purple',
        padding: 1,
        borderRadius: 10,
      }}
    >
      <CardMedia
        onClick={handleClickOpen}
        title={gallery.title}
        component="img"
        image={pic}
        sx={{
          cursor: 'pointer',
          width: '15rem',
          height: '15rem',
          borderRadius: 10,
        }}
      />
      {user?._id == userId && (
        <Box marginTop={1} textAlign="center">
          <Button variant="outlined" color="error">
            delete
          </Button>
        </Box>
      )}
      <Box
        onClick={() => navigate(`/${gallery.user._id}`)}
        sx={{
          marginTop: 1,
          padding: 1,
          borderRadius: 5,
          border: '2px solid black',
        }}
      >
        <Typography textAlign="center" component="p" variant="body1">
          {gallery.title}
        </Typography>
        <Typography textAlign="center" component="p" variant="body1">
          by {gallery.user.displayName}
        </Typography>
      </Box>

      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <CardMedia
            onClick={handleClickOpen}
            title={gallery.title}
            component="img"
            image={pic}
            sx={{
              width: '30rem',
              height: '30rem',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose} endIcon={<CloseIcon />}>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
};

export default Gallery;
