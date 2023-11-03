import React from 'react'
import { apiConnector } from '../apiConnector'
import { endpoints} from '../apis'
import { setToken } from '../../slices/auth'
import { setUser } from '../../slices/profileSlice'

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API
} = endpoints


export function sendOtp(email , navigate) {

  return async (dispatch) => {

    try {
      const response = await apiConnector("POST",SENDOTP_API, {email }  )

      console.log("SENDOTP API RESPONSE " , response)
      console.log(response.data.success)
      navigate("/verifyemail")
    } 
    catch (error) {
      console.log("SENDOTP API ERROR............", error)
    }

  }
}



export function signUp(firstname,lastname,email,password,confirmPassword,accountType,otp,navigate) {

    return async(dispatch)=>{

      try {
        
        const response = await apiConnector("POST",SIGNUP_API,{firstname,lastname,email,password,confirmPassword,accountType,otp,navigate})
        
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
      const response = await apiConnector("POST",LOGIN_API,{email,password})
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

export function getPasswordResetToken(email,setEmailSent){
  return async(dispatch) =>{
    try{
      const response = await apiConnector("POST",RESETPASSTOKEN_API,{email})
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      // toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      // toast.error("Failed to send email for resetting password");
    }
  }
}

export function resetPassword(password,confirmPassword,token,setResetDone){
  return async(dispatch)=>{
    // dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);

      
      // if(!response.data.success) {
      //   throw new Error(response.data.message);
      // }
      setResetDone(true)
      // toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      // toast.error("Unable to reset password");
    }
    // dispatch(setLoading(false));
  }
}
