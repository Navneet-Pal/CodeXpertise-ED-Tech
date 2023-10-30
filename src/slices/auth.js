import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") ) : null , 
    signupData:null,
}

export const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {
        setToken(state,value){
            state.token = value.payload;
        },
        setSignupData(state,value){
            state.signupData = value.payload;
        }
    },
})

export const {setSignupData,setToken} = authSlice.actions;
export default authSlice.reducer;