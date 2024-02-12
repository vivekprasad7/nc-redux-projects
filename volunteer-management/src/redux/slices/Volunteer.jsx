import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getVolunteers = createAsyncThunk("volunteers/fetchVolunteers", async () => {
    const res = await axios.get("https://9671719c-7c5c-47a5-a4f6-ac7503357d0a-00-1h1emies30arz.worf.replit.dev/volunteer")
    return res.data.volunteers;
})

export const addVolunteer = createAsyncThunk("volunteers/add", async (data) => {
    console.log("addVolunteer", data)
    const res = await axios.post(`https://9671719c-7c5c-47a5-a4f6-ac7503357d0a-00-1h1emies30arz.worf.replit.dev/volunteer`, data)
    console.log("addVolunteer", res.data)

    return res.data.addedVolunteer;
})

export const updateVolunteer = createAsyncThunk("volunteers/update", async (data) => {
    console.log("updateVolunteer", data)

    const res = await axios.post(`https://9671719c-7c5c-47a5-a4f6-ac7503357d0a-00-1h1emies30arz.worf.replit.dev/volunteer/${data._id}`, data)
    console.log("updateVolunteer", res.data)

    return res.data.updatedVolunteer;
})

export const deleteVolunteer = createAsyncThunk("volunteers/add", async (id) => {
    console.log("deleteVolunteer", id)
    const res = await axios.delete(`https://9671719c-7c5c-47a5-a4f6-ac7503357d0a-00-1h1emies30arz.worf.replit.dev/volunteer/${id}`)
    console.log("deleteVolunteer", res.data)

    return res.data.deletedVolunteer;
})


export const volunteerSlice = createSlice({
    name: "volunteer",
    initialState: {
        status: "idle",
        error: null,
        volunteers: []
    },
    reducers: {},
    extraReducers: {
        [getVolunteers.pending]: (state) => {
            state.status = "loading"
        },
        [getVolunteers.fulfilled]: (state, action) => {
            state.volunteers = [...action.payload]
        },
        [getVolunteers.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [addVolunteer.pending]: (state) => {
            state.status = "loading"
        },
        [addVolunteer.fulfilled]: (state, action) => {
            state.volunteers = [...state.volunteers, action.payload]
        },
        [addVolunteer.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [updateVolunteer.pending]: (state) => {
            state.status = "loading"
        },
        [updateVolunteer.fulfilled]: (state, action) => {
            state.volunteers = state.volunteers.map((item) => item._id === action.payload._id ? { ...action.payload } : item)
        },
        [updateVolunteer.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [deleteVolunteer.pending]: (state) => {
            state.status = "loading"
        },
        [deleteVolunteer.fulfilled]: (state, action) => {
         state.volunteers = state.volunteers.filter((item) => item._id !== action.payload._id)
         return state;
        },
        [deleteVolunteer.rejected]: (state, action) => {
            state.error = action.error.message
        },
    }
})


export default volunteerSlice.reducer;