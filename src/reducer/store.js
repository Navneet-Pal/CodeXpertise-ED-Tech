import { configureStore } from "@reduxjs/toolkit";
import auth from "../slices/auth";
import profileSlice from "../slices/profileSlice";

export const store = configureStore({
    reducer:{
        auth: auth,
        profile:profileSlice,
    }
})