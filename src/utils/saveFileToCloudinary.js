import cloudinary from 'cloudinary';

import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const filePath = typeof file === 'string' ? file : file.path;
  const response = await cloudinary.v2.uploader.upload(filePath);
  return response;
};
