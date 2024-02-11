import { createSlice } from "@reduxjs/toolkit";

export const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    totalPatients: "",
    occupancyRate: "",
    avgLengthOfStay: "",
    topPerformingWard: ""
  },
  reducers: {
    totalSetter: (state, action) => {
      state.totalPatients = action.payload;
    },
    occupancySetter: (state, action) => {
      state.occupancyRate = action.payload;
    },
    avgLengthOfStay: (state, action) => {
      state.avgLengthOfStay = action.payload;
    },
    topPerformingWard: (state, action) => {
      state.topPerformingWard = action.payload;
    },
    hospitalReset: (state) => {
      (totalPatients = ""),
        (occupancyRate = ""),
        (avgLengthOfStay = ""),
        (topPerformingWard = "");
    }
  }
});

export default hospitalSlice.reducer;
