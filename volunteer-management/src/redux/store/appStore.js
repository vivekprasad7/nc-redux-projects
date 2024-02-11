import  createStore from "@reduxjs/toolkit"
import { volunteerSlice } from "../slices/Volunteer"
import { eventSlice } from "../slices/Event"

export default createStore({
    reducer:{
        volunteer:volunteerSlice.reducer,
        event:eventSlice.reducer,
    }
})