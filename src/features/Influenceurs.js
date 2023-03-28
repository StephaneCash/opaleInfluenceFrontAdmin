import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllInfluenceurs = createAsyncThunk("influenceurs/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/influenceurs`);
        const arr = data.slice(0, arg)
        return arr
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newInfluenceur = createAsyncThunk("influenceurs/create",
    async (data) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/influenceurs`, data);
            toast.success('Influenceur ajouté avec succès');
            //navigate("/categories");
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const updateInfluenceur = createAsyncThunk("influenceurs/update",
    async (data) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.put(`${baseUrl}/influenceurs/${data && data.id}`, data && data.form);
            toast.success('Catégorie modifiée avec succès');
            //navigate("/categories");
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteInfluenceur = createAsyncThunk("influenceurs/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/influenceurs/${id}`);
            toast.success('Catégorie supprimée avec succès');
            //navigate("/categories");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const influenceurSlice = createSlice({
    name: "influenceurs",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL INFLUENCEURS
        [getAllInfluenceurs.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllInfluenceurs.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllInfluenceurs.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE INFLUENCEUR
        [newInfluenceur.pending]: (state, action) => {
            state.loading = true;
        },
        [newInfluenceur.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newInfluenceur.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE INFLUENCEUR
        [deleteInfluenceur.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteInfluenceur.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteInfluenceur.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE INFLUENCEUR
        [updateInfluenceur.pending]: (state, action) => {
            state.loading = true;
        },
        [updateInfluenceur.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateInfluenceur.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default influenceurSlice;