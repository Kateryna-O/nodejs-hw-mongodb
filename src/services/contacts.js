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

export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const deleteContactById = async (contactId) => {
  const contact = await contactsCollection.findOneAndDelete(contactId);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
      upsert: false,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
