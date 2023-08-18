import { createAsyncThunk } from '@reduxjs/toolkit'
import { $instance } from './actions';

export const requestContactsThunk = createAsyncThunk(
    'contacts/getAll',
    async (_, thunkApi) => {
        try {
            const res = await $instance.get('/contacts');
            return res.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)