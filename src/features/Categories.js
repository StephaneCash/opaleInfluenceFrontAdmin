import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";

export const getAllcategories = createAsyncThunk("categories/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/categories`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newCategorie = createAsyncThunk("categories/create", async (data, {
    rejectWithValue
}) => {
    try {
        const resp = await axios.post(`${baseUrl}/categories`, data);
        console.log(resp.data , " create")
        return resp.data;
    } catch (error) {
        rejectWithValue(error.response);
    }
})

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        [getAllcategories.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getAllcategories.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllcategories.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        [newCategorie.pending]: (state, action) => {
            state.loading = true;
        },
        [newCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default categoriesSlice;