import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
  name: "class",
  initialState: {
    status: "idle",
    error: null,
    standard: "all",
    gender: "",
    sortBy: "none",
  },
  reducers: {
    classSetter: (state, action) => {
      state.standard = action.payload;
    },
    genderSetter: (state, action) => {
      state.gender = action.payload;
    },
    sortSetter: (state, action) => {
      state.sortBy = action.payload;
    },
    classReset: (state) => {
      state.standard = "all";
      state.gender = "";
      state.sortBy = "";
    },
  },
});

export const {
    classSetter,
    sortSetter,
    genderSetter,
    classReset
} = classSlice.actions

export default classSlice.reducer;
