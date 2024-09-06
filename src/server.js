import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

import { ENV_VARS, UPLOAD_DIR } from './constants/index.js';
import { env } from './utils/env.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  const pino = pinoHttp({
    transport: { target: 'pino-pretty' },
  });

  app.use(pino);

  app.use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200,
    }),
  );

  app.use(cookieParser());
  app.get(`/`, (req, res) => {
    res.send('Contacts app');
  });

  app.use(router);

  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
