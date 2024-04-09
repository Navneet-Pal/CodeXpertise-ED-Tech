import { configureStore } from "@reduxjs/toolkit";
import auth from "../slices/auth";
import profileSlice from "../slices/profileSlice";
import cartSlice from '../slices/cartSlice'
import courseSlice from "../slices/courseSlice";
import viewCourseReducer from "../slices/viewCourseSlice"

export const store = configureStore({
    reducer:{
        auth: auth,
        profile:profileSlice,
        cart:cartSlice,
        course:courseSlice,
        viewCourse: viewCourseReducer,
    }
})