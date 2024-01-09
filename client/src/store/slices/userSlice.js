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
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;