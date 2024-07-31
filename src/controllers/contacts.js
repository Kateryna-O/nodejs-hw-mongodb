import { getAllContacts, getContactsById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.send({
    status: 200,
    message: `Succesfully found contact with id ${contactId}`,
    data: contact,
  });
};
