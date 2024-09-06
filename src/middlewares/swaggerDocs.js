import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    console.log(SWAGGER_PATH);
    const swaggerDoc = fs.readFileSync(SWAGGER_PATH, 'utf-8');
    return [...swaggerUI.serve, swaggerUI.setup(JSON.parse(swaggerDoc))];
  } catch (err) {
    console.error('Error loading swagger docs:', err);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
