import multer from 'multer';
import config from './config';
import path from 'path';
import { promises as fs } from 'fs';
import { Error } from 'mongoose';
import { randomUUID } from 'node:crypto';

const imageStorage = multer.diskStorage({
  destination: async (_req, file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, destDir);
  },
  filename(req, file, cb) {
    const ex = path.extname(file.originalname);
    cb(null, '/' + randomUUID() + ex);
  },
});

export const imagesUpload = multer({
  storage: imageStorage,
});
