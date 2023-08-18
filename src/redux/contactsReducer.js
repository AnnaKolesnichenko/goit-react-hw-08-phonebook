import { createSlice } from '@reduxjs/toolkit';
import {
  createContactThunk,
  deleteContactThunk,
  requestContactsThunk,
} from './contactsActions';

const initialState = {
  contacts: null,
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(requestContactsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(requestContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createContactThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(createContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          item => item.id !== action.payload.id
        );
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
