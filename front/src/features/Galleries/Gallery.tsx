import { IGallery } from '../../types';
import { apiUrl } from '../../globalConstant.ts';
import { CardMedia, Grid2, Typography } from '@mui/material';

interface Props {
  gallery: IGallery;
}

const Gallery: React.FC<Props> = ({ gallery }) => {
  let pic = '';
  if (gallery.image) {
    pic = apiUrl + '/' + gallery.image;
  }

  return (
    <Grid2>
      <CardMedia
        title={gallery.title}
        component="img"
        image={pic}
        sx={{
          width: '15rem',
          height: '15rem',
        }}
      />
      <Typography textAlign="center" component="p" variant="body1">
        {gallery.title}
      </Typography>
      <Typography textAlign="center" component="p" variant="body1">
        by {gallery.user.displayName}
      </Typography>
    </Grid2>
  );
};

export default Gallery;
