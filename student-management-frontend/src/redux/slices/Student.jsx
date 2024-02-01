import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getStudents = createAsyncThunk("student/fetchStudent", async () => {
    const res = await axios.get("https://neog-assignmentat20at21at22.onrender.com/student/")
    console.log(res.data)
    return res.data.student;
})

export const addStudent = createAsyncThunk("student/addStudent", async (data) => {
    const res = await axios.post(`https://neog-assignmentat20at21at22.onrender.com/student/`, data )
    return res.data.student
})

export const editStudent = createAsyncThunk("student/editStudent", async (data) => {
    const res = await axios.put(`https://neog-assignmentat20at21at22.onrender.com/student/${data._id}`, data )
    console.log("edit", res.data)
    return res.data.student
})


export const deleteStudent = createAsyncThunk("student/deleteStudent", async (id) => {
    const res = await axios.post(`https://neog-assignmentat20at21at22.onrender.com/student/${id}` )
    return {data: res.data, id: id}
})



export const studentSlice = createSlice({
    name:'Student',
    initialState:{
        status:"idle",
        error:null,
        students:[]
    },
    reducers:{
        getStudents:(state, action) => {
            state.student = action.payload;
        }
    },
    extraReducers:{
        [getStudents.pending] :(state) => {
            state.status = "loading"
        },
        [getStudents.fulfilled] :(state, action) => {
            state.status = "success";
            state.students = action.payload;
        },
        [getStudents.rejected] :(state, action) => {
            state.status = "error"
            state.error = action.error.message;
        },
        [addStudent.pending] : (state) =>{
            state.status = "loading"
        },
        [addStudent.fulfilled] : (state, action) =>{
            state.status = "success",
            state.students = [...state.students, action.payload]
        },
        [addStudent.rejected] : (state, action) =>{
            state.status = "error",
            state.error = action.error.message;
        },
        [editStudent.pending] : (state) =>{
            state.status = "loading"
        },
        [addStudent.fulfilled] : (state, action) =>{
            state.status = "success",
            state.students = state.students.map((item) => 
                item._id === action.payload._id ? {...action.payload} : item
            )
        },
        [editStudent.rejected] : (state, action) =>{
            state.status = "error",
            state.error = action.error.message;
        },
        [deleteStudent.pending] : (state) => {
            state.status = "loading"
        },
        [deleteStudent.fulfilled] : (state, action) => {
            state.status = "success"
            state.students = state.students.filter((student) => student._id !== action.payload.id )
        },
        [deleteStudent.rejected] : (state, action) => {
            state.status = "error",
            state.error = action.error.message
        }

    }
})

export default studentSlice.reducer;