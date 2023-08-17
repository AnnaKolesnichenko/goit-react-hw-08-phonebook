import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, logoutUserThunk, refreshUserThunk, registerUserThunk } from './actions';

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
      })
      //LOGIN
    .addCase(loginUserThunk.pending, state => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
    })
    .addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })//RFEFRESH
    .addCase(refreshUserThunk.pending, state => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload;
    })
    .addCase(refreshUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    //LOGOUT
    .addCase(logoutUserThunk.pending, state => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.authentificated = false;
        state.userData = null;
        state.token = null;
    })
    .addCase(logoutUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    
});

export const { setFilter } = authentSlice.actions;
export const authentReducer = authentSlice.reducer;
