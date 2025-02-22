import express from 'express';
import { Error } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import Gallery from '../models/Gallery';

const galleriesRouter = express.Router();

galleriesRouter.get('/', async (req, res, next) => {
  const { id } = req.query;

  try {
    let filter = id ? { user: id } : {};
    const galleries = await Gallery.find(filter).populate('user');
    res.status(200).send(galleries);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(500).send(error);
    }
    next(error);
  }
});

galleriesRouter.delete('/:galleryId', async (req, res, next) => {
  try {
    const { galleryId } = req.params;
    const deletedGallery = await Gallery.deleteOne({ _id: galleryId });
    res.status(200).json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(500).send(error);
    }
    next(error);
  }
});

galleriesRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
  const expressReq = req as RequestWithUser;
  const user = expressReq.user;

  try {
    const newGallery = new Gallery({
      user,
      title: req.body.title,
      image: req.file ? 'images' + req.file.filename : null,
    });

    await newGallery.save();
    res.status(200).send({ message: 'Successfully created Gallery', newGallery });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(500).send(error);
    }
    next(error);
  }
});

export default galleriesRouter;
