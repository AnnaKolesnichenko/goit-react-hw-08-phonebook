import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const $instance = axios.create({
    baseURL: 'https://connections-api.herokuapp.com',
    headers: {
        Authorization: `Bearer token ...`
    }
});


export const createToken = token => {
    $instance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const clearToken = token => {
    $instance.defaults.headers['Authorization'] = '';
};


export const registerUserThunk = createAsyncThunk(
    'authent/register',
    async (userData, thunkApi) => {
        try{
            const res = await $instance.post('/users/signup', userData);
            createToken(res.data.token);
            return res.data;
        }
        catch (error) {
            console.log('error', error.message)
            return thunkApi.rejectWithValue(error.message);
        }
    }
); 

export const loginUserThunk = createAsyncThunk(
    'authent/login',
    async (userData, thunkApi) => {
        try{
            const res = await $instance.post('/users/login', userData);
            createToken(res.data.token);
            return res.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
); 

export const refreshUserThunk = createAsyncThunk(
    'authent/refresh',
    async (_, thunkApi) => {
        const state = thunkApi.getState();
        const token = state.authent.token;

        try{
            createToken(token);
            const res = await $instance.get('/users/current');
            return res.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
); 

export const logoutUserThunk = createAsyncThunk(
    'authent/logout',
    async (_, thunkApi) => {
        try{
            const res = await $instance.post('/users/logout');
            clearToken();
            return res.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
); 

