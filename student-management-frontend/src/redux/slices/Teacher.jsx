import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const getTeachers = createAsyncThunk("teacher/fetchStudent", async () => {
    const res = await axios.get(`https://neog-assignmentat20at21at22.onrender.com/teacher/`)
    return res.data.teacher;
})

export const addTeacher = createAsyncThunk("teacher/addTeacher", async(data) => {
    const res = await axios.put(`https://neog-assignmentat20at21at22.onrender.com/teacher/${data._id}`, data)
})

export const editTeacher = createAsyncThunk("teacher/editTeacher", async(data) => {
    const res = await axios.put(`https://neog-assignmentat20at21at22.onrender.com/teacher/${data._id}`,data)
    console.log(res)
    return res.data.teacher;
})

export const deleteTeacher = createAsyncThunk("teacher/deleteTeacher", async(id) => {
    const res = await axios.delete(`https://neog-assignmentat20at21at22.onrender.com/teacher/${id}`)
    return {data: res.data.teacher, id:id}
})

export const teacherSlice = createSlice({
    name:'teacher',
    initialState:{
        status:"idle",
        error:null,
        teachers:[]
    },
    reducers:{
        getTeachers: (state, action) => {
            state.teachers = action.payload
        }
    },
    extraReducers:{
        [getTeachers.pending]:(state) =>{
            state.status = "loading"
        },
        [getTeachers.fulfilled]:(state, action)=>{
            state.status="success",
            state.teachers = [...action.payload]
        },
        [getTeachers.rejected]:(state, action)=>{
            state.status="error",
            state.error = action.error.message
        },
        [addTeacher.pending]:(state)=> {
            state.status = "loading"
        },
        [addTeacher.fulfilled]:(state, action)=> {
            state.status ="success",
            state.teacher =[...state.teacher, action.payload]
        },
        [addTeacher.rejected]:(state, action)=> {
            state.status ="error",
            state.error =action.error.message;
        },
        [editTeacher.pending]:(state)=>{
            state.status ="pending"
        },
        [editTeacher.fulfilled]:(state, action)=>{
            state.status = "success",
            state.teachers = state.teachers.map((teacher) => teacher._id === action.payload._id ? {...action.payload} : teacher)
        },
        [editTeacher.rejected]:(state, action) => {
            state.status = "error",
            state.error = action.error.message;
        },
        [deleteTeacher.pending]:(state)=>{
            state.status="pending"
        },
        [deleteTeacher.fulfilled]:(state,action)=>{
            state.status="success",
            state.teachers= state.teachers.filter(({_id}) => _id !== action.payload._id)
        },
        [deleteTeacher.rejected]:(state,action)=>{
            state.status = "error",
            state.error = action.error.message;
        }
    }
})

export default teacherSlice.reducer;