import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get(`/`, ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactController));

router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
