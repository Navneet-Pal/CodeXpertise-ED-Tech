import React from 'react'
import { apiConnector } from '../apiConnector'
import { signup } from '../apis'
import { loginapi } from '../apis'
import { setToken } from '../../slices/auth'
import { setUser } from '../../slices/profileSlice'

export function signUp(firstname,lastname,email,password,confirmPassword,accountType,otp,navigate) {

    return async(dispatch)=>{

      try {
        
        const response = await apiConnector("POST",signup.SIGNUP_API,{firstname,lastname,email,password,confirmPassword,accountType,otp,navigate})
        
        console.log("SIGNUP API RESPONSE............", response)
        navigate("/login")
      } 
      catch (error) {
        console.log("SIGNUP API ERROR............", error)
        
        navigate("/signup")
      }
    }
}

export function login(email,password,navigate){
  return async(dispatch)=>{
    try {
      const response = await apiConnector("POST",loginapi.LOGIN_API,{email,password})
      console.log("LOGIN API RESPONSE............", response);
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))

      localStorage.setItem("token",JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      navigate("/dashboard/my-profile")
    } 
    catch (error) {
      console.log("SIGNUP API ERROR............", error)
      navigate("/login")
    }
  }
}

export function logout(navigate){
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }
}

