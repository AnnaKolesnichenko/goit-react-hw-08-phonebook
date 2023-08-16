import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const $instance = axios.create({
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
            console.log(res);
            return res.data;
        }
        catch (error) {
            console.error("API request error:", error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)
