import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getEvents = createAsyncThunk("events/fetchEvents", async () => {
    const res = await axios.get("https://9671719c-7c5c-47a5-a4f6-ac7503357d0a-00-1h1emies30arz.worf.replit.dev/event")
    return res.data.events;
})

export const addEvent = createAsyncThunk("events/add", async (data) => {
    console.log("add-event", data )
    const res = await axios.post(`https://9671719c-7c5c-47a5-a4f6-ac7503357d0a-00-1h1emies30arz.worf.replit.dev/event`, data)
    console.log("add-event", res.data )
    return res.data.addedEvent;
})

export const updateEvent = createAsyncThunk("events/update", async (data) => {
    const res = await axios.post(`https://9671719c-7c5c-47a5-a4f6-ac7503357d0a-00-1h1emies30arz.worf.replit.dev/event/${data._id}`, data)
    return res.data.updatedEvent;
})

export const deleteEvent = createAsyncThunk("events/add", async (id) => {
    const res = await axios.delete(`https://9671719c-7c5c-47a5-a4f6-ac7503357d0a-00-1h1emies30arz.worf.replit.dev/event/${id}`)
    return res.data.deletedEvent;
})


export const eventSlice = createSlice({
    name: "event",
    initialState: {
        status: "idle",
        error: null,
        events: []
    },
    reducers: {},
    extraReducers: {
        [getEvents.pending]: (state) => {
            state.status = "loading"
        },
        [getEvents.fulfilled]: (state, action) => {
            state.events = [...action.payload]
        },
        [getEvents.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [addEvent.pending]: (state) => {
            state.status = "loading"
        },
        [addEvent.fulfilled]: (state, action) => {
            state.events = [...state.events, action.payload]
        },
        [addEvent.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [updateEvent.pending]: (state) => {
            state.status = "loading"
        },
        [updateEvent.fulfilled]: (state, action) => {
            state.events = state.events.map((item) => item._id === action.payload._id ? { ...action.payload } : item)
        },
        [updateEvent.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [deleteEvent.pending]: (state) => {
            state.status = "loading"
        },
        [deleteEvent.fulfilled]: (state, action) => {
            state.events = state.events.filter((item) => item._id !== action.payload._id)
            return state;
        },
        [deleteEvent.rejected]: (state, action) => {
            state.error = action.error.message
        },
    }
})


export default eventSlice.reducer;