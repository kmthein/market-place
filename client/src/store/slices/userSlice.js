import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        saveProductAction: (state, action) => {
            state.user.saved_products = action.payload;
        },
        unsaveProductAction: (state, action) => {
            state.user.saved_products = action.payload;
        },
    }
})

export const { setUser, saveProductAction, unsaveProductAction } = userSlice.actions;

export default userSlice.reducer;