import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import galleriesRouter from './routers/galleries';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/galleries', galleriesRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server run on port http//:localhost/${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((err) => {
  console.error(err);
});
