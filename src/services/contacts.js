import { contactsCollection } from '../model/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await contactsCollection.find();
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const getContactsById = async (contactId) => {
  try {
    const contacts = await contactsCollection.findById(contactId);
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};
