import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    secretId: process.env.GOOGLE_CLIENT_SECRET,
  },
  db: 'mongodb://localhost/exam12',
};

export default config;
