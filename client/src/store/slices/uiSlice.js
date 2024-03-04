import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProcessing: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isProcessing = true;
    },
    endLoading: (state, action) => {
      state.isProcessing = false;
    },
  },
});

export const { setLoading, endLoading } = uiSlice.actions;

export default uiSlice.reducer;
