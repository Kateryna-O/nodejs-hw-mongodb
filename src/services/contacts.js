import { contactsCollection } from '../model/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = contactsCollection.find();
    const contactsCount = await contactsCollection
      .find()
      .merge()
      .countDocuments();
    const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

    const paginationData = calculatePaginationData(
      contactsCount,
      perPage,
      page,
    );
    return {
      data: contacts,
      ...paginationData,
    };
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
