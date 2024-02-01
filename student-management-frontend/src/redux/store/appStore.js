import {configureStore} from "@reduxjs/toolkit"
import { teacherSlice } from "../slices/Teacher"
import { studentSlice } from "../slices/Student"
import { classSlice } from "../slices/Class"


export default configureStore({
    reducer:{
        student:studentSlice.reducer,
        teacher:teacherSlice.reducer,
        class:classSlice.reducer
    }
})