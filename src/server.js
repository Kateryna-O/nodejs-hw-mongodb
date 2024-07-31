import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

import { ENV_VARS } from './constants/index.js';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const setupServer = () => {
  const app = express();

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

  app.get(`/`, (req, res) => {
    res.send('Contacts app');
  });

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
