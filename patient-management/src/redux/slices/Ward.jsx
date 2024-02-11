import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getWards = createAsyncThunk("ward/getWards", async () => {
  const res = await axios.get(
    "https://ae805766-5cde-46b3-bc07-cc9f359dde69-00-2atzlsfa56a9g.kirk.replit.dev/ward"
  );

  return res.data.wards;
});

export const addWard = createAsyncThunk("ward/addWard", async (data) => {
  console.log("add-ward", data);
  const res = await axios.post(
    "https://ae805766-5cde-46b3-bc07-cc9f359dde69-00-2atzlsfa56a9g.kirk.replit.dev/ward",
    data
  );
  console.log("add-ward-res", data);
  return res.data.wards;
});

export const updateWard = createAsyncThunk("ward/updateWard", async (data) => {
  console.log("update-ward", data);
  const res = await axios.post(
    `https://ae805766-5cde-46b3-bc07-cc9f359dde69-00-2atzlsfa56a9g.kirk.replit.dev/ward/${data._id}`,
    data
  );
  console.log("res-update-ward", res.data);

  return res.data.updatedWard;
});

export const deleteWard = createAsyncThunk(
  "ward/deleteWard",
  async (patientId) => {
    const res = await axios.delete(
      `https://ae805766-5cde-46b3-bc07-cc9f359dde69-00-2atzlsfa56a9g.kirk.replit.dev/ward/${patientId}`
    );
    return res.data.deletedWard;
  }
);

export const wardSlice = createSlice({
  name: "ward",
  initialState: {
    status: "idle",
    error: null,
    wards: []
  },
  reducers: {},
  extraReducers: {
    [getWards.pending]: (state) => {
      state.status = "loading";
    },
    [getWards.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = [...action.payload];
    },
    [getWards.rejected]: (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    },
    [addWard.pending]: (state) => {
      state.status = "loading";
    },
    [addWard.fulfilled]: (state, action) => {
      (state.status = "success"),
        (state.wards = [...state.wards, action.payload]);
    },
    [addWard.rejected]: (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    },
    [updateWard.pending]: (state) => {
      state.status = "loading";
    },
    [updateWard.fulfilled]: (state, action) => {
      (state.status = "success"),
        (state.wards = state.wards.map((ward) => {
          return ward._id === action.payload._id ? { ...action.payload } : ward;
        }));
    },
    [updateWard.rejected]: (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    },
    [deleteWard.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWard.fulfilled]: (state, action) => {
      (state.status = "success"),
        (state.wards = state.wards.filter(
          (ward) => ward._id !== action.payload._id
        ));
    },
    [deleteWard.rejected]: (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    }
  }
});

export default wardSlice.reducer;
