import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

import { ENV_VARS } from './constants/index.js';
import { env } from './utils/env.js';
import { getAllContacts, getContactsById } from './services/contacts.js';

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

  app.get(`/contacts`, async (req, res, next) => {
    const contacts = await getAllContacts();
    res.send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);
    try {
      if (!contact) {
        res.status(404).send({
          message: 'Contact not found',
        });
        return;
      }
      res.send({
        status: 200,
        message: `Succesfully found contact with id ${contactId}`,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((req, res, next) => {
    res.status(404).send({ status: 404, message: 'Not Found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).send({ status: 500, message: 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
