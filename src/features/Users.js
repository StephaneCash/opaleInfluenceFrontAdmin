import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";

export const getAllUsers = createAsyncThunk("users/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/users`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newUser = createAsyncThunk("users/create", async (data, {
    rejectWithValue
}) => {
    try {
        const resp = await axios.post(`${baseUrl}/users`, data);
        return resp;
    } catch (error) {
        rejectWithValue(error.response);
    }
})

export const userSlice = createSlice({
    name: "users",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        [getAllUsers.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getAllUsers.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllUsers.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        [newUser.pending]: (state, action) => {
            state.loading = true;
        },
        [newUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = [action.payload];
            state.isSuccess = true;
        },
        [newUser.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default userSlice;