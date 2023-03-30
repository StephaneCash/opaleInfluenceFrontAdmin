import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllContacts = createAsyncThunk("contacts/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/contacts`);
        const array = data.slice(0, arg)
        return array;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newContact = createAsyncThunk("contacts/create",

    async (data, { rejectWithValue }) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/contacts`, data);
            if (resp && resp.data) {
                toast.success('Contact ajouté avec succès');
            }
            //navigate("/contacts");
            return resp.data;
        } catch (error) {
            console.log(error.response);
            rejectWithValue(error.response)
        }
    });

export const updateContact = createAsyncThunk("contacts/update",
    async (data) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.put(`${baseUrl}/contacts/${data && data.id}`, data && data.form);
            toast.success('Contact modifié avec succès');
            //navigate("/contacts");
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteContact = createAsyncThunk("contacts/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/contacts/${id}`);
            toast.success('Contact supprimé avec succès');
            //navigate("/contacts");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL contacts
        [getAllContacts.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllContacts.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllContacts.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE Contact
        [newContact.pending]: (state, action) => {
            state.loading = true;
        },
        [newContact.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newContact.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deleteContact.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteContact.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteContact.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Contact
        [updateContact.pending]: (state, action) => {
            state.loading = true;
        },
        [updateContact.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateContact.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default contactsSlice;