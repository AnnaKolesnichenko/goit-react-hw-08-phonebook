import { createSlice } from "@reduxjs/toolkit";
import { requestContactsThunk } from "./contactsActions";

const initialState = {
    contacts: null,
    isLoading: false,
    error: null
}

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
    }
});

export const contactsReducer = contactsSlice.reducer; 