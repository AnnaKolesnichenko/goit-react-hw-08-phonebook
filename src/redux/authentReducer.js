import { createSlice } from '@reduxjs/toolkit';
import { registerUserThunk } from './actions';

const initialState = {
  userData: null,
  authentificated: false,
  token: null,
  isLoading: false,
  error: null,
  filter: '',
};

const authentSlice = createSlice({
  name: 'authent',
  initialState: initialState,
  reducers: {
    // setFilter: (state, action) => {
    //   state.filter = action.payload;
    // },
  },

  extraReducers: builder =>
    builder
      .addCase(registerUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.authentificated = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
  //   .addCase(addContact.pending, state => {
  //     state.isLoading = true;
  //     state.error = null;
  //   })
  //   .addCase(addContact.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.items.push(action.payload);
  //   })
  //   .addCase(addContact.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   })
  //   .addCase(deleteContactById.pending, state => {
  //     state.isLoading = true;
  //     state.error = null;
  //   })
  //   .addCase(deleteContactById.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.items = state.items.filter(
  //       contact => contact.id !== action.payload
  //     );
  //   })
  //   .addCase(deleteContactById.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   }),
});

export const { setFilter } = authentSlice.actions;
export const authentReducer = authentSlice.reducer;
