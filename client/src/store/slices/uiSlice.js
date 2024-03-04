import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
    },
    endLoading: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, endLoading } = uiSlice.actions;

export default uiSlice.reducer;
