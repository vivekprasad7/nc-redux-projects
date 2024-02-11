import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPatients = createAsyncThunk(
  "patient/fetchPatients",
  async () => {
    const res = await axios.get(
      "https://ae805766-5cde-46b3-bc07-cc9f359dde69-00-2atzlsfa56a9g.kirk.replit.dev/patient"
    );
    return res.data.patients; // res.data.patients
  }
);

export const addPatient = createAsyncThunk(
  "patient/addPatient",
  async (data) => {
    const res = await axios.post(
      "https://ae805766-5cde-46b3-bc07-cc9f359dde69-00-2atzlsfa56a9g.kirk.replit.dev/patient",
      data
    );
    console.log(res.data.addedPatient);
    return res.data.addedPatient;
  }
);

export const updatePatient = createAsyncThunk(
  "patient/editPatient",
  async (data) => {
    console.log("updateData", data);
    const res = await axios.post(
      `https://ae805766-5cde-46b3-bc07-cc9f359dde69-00-2atzlsfa56a9g.kirk.replit.dev/patient/${data?._id}`,
      data
    );
    console.log("updatedReturn", res.data);
    return res.data.updatedPatient;
  }
);

export const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  async (patientId) => {
    console.log("dispatch delete");
    const res = await axios.delete(
      `https://ae805766-5cde-46b3-bc07-cc9f359dde69-00-2atzlsfa56a9g.kirk.replit.dev/patient/${patientId}`
    );
    console.log("res", res.data);
    return res.data.deletedPatient;
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState: {
    status: "idle",
    error: null,
    patients: []
  },
  reducers: {},
  extraReducers: {
    [getPatients.pending]: (state) => {
      state.status = "loading";
    },
    [getPatients.fulfilled]: (state, action) => {
      (state.status = "success"), (state.patients = [...action.payload]);
    },
    [getPatients.rejected]: (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    },
    [addPatient.pending]: (state) => {
      state.status = "loading";
    },
    [addPatient.fulfilled]: (state, action) => {
      (state.status = "success"),
        (state.patients = [...state.patients, action.payload]);
    },
    [addPatient.rejected]: (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    },
    [updatePatient.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatient.fulfilled]: (state, action) => {
      (state.status = "success"),
        (state.patients = state.patients.map((patient) =>
          patient._id === action.payload._id ? { ...action.payload } : patient
        ));
    },
    [updatePatient.rejected]: (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    },
    [deletePatient.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatient.fulfilled]: (state, action) => {
      (state.status = "success"),
        (state.patients = state.patients.filter(
          (patient) => patient._id !== action.payload._id
        ));
    },
    [deletePatient.rejected]: (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    }
  }
});

export default patientSlice.reducer;
