import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, postContact, deleteContact } from 'services/services';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await fetchContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkApi) => {
    try {
      const contacts = await postContact(contact);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactById = createAsyncThunk(
  'contacts/deleteContactById',
  async (contactId, thunkApi) => {
    try {
      await deleteContact(contactId);
      return contactId;      
    } catch (error) {
      return thunkApi.rejectWithValue(error => console.log(error.message));
    }
  }
);
