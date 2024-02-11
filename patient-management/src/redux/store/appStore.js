import { configureStore } from "@reduxjs/toolkit";
import { wardSlice } from "../slices/Ward";
import { patientSlice } from "../slices/Patient";
import { hospitalSlice } from "../slices/Hospital";

export default configureStore({
  reducer: {
    patient: patientSlice.reducer,
    ward: wardSlice.reducer,
    hospital: hospitalSlice.reducer
  }
});
