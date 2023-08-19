import { createAsyncThunk } from '@reduxjs/toolkit';
import { $instance } from '../auth/actions';

export const requestContactsThunk = createAsyncThunk(
    'contacts/getAll',
    async (_, thunkApi) => {
        try {
            const res = await $instance.get('/contacts');
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const createContactThunk = createAsyncThunk(
    'contacts/addContact',
    async (userData, thunkApi) => {
        try {
            const res = await $instance.post('/contacts', userData);
            return res.data;
} catch (error) {
      return thunkApi.rejectWithValue(error.message);
        }
        }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      const res = await $instance.delete(`/contacts/${id}`);
      return res.data;
    } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
