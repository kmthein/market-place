import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "../store/slices/userSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
}

const combineReducer = combineReducers({
    user: userReducer
}) 

const persist_reducer = persistReducer(persistConfig, combineReducer) 

const store = configureStore({
    reducer: {
        reducer: persist_reducer
    }
})

export default store;