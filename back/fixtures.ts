import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import { randomUUID } from 'node:crypto';
import Gallery from './models/Gallery';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('galleries');
  } catch (error) {
    console.log('Collection did not present');
  }
  const [admin, user] = await User.create(
    {
      email: 'admin@gmail.com',
      password: '123',
      displayName: 'Admin',
      avatar: 'fixtures/admin2.png',
      role: 'admin',
      token: randomUUID(),
    },
    {
      email: 'user@gmail.com',
      password: '123',
      displayName: 'user',
      avatar: 'fixtures/user2.png',
      role: 'user',
      token: randomUUID(),
    },
  );

  await Gallery.create(
    {
      user: admin,
      title: 'Admin1',
      image: 'fixtures/admin2.png',
    },
    {
      user: admin,
      title: 'Admin2',
      image: 'fixtures/admin2.png',
    },
    {
      user: user,
      title: 'User1',
      image: 'fixtures/user2.png',
    },
    {
      user: user,
      title: 'User2',
      image: 'fixtures/user2.png',
    },
  );

  await db.close();
};

run().catch(console.error);
