import  {configureStore} from "@reduxjs/toolkit"
import { volunteerSlice } from "../slices/Volunteer"
import { eventSlice } from "../slices/Event"

const appStore = configureStore({
    reducer:{
        volunteer:volunteerSlice.reducer,
        event:eventSlice.reducer,
    }
})

export default appStore;