import React from 'react'
import { apiConnector } from '../apiConnector'
import { useDispatch } from 'react-redux'
import { sendotp } from '../apis';

function sendOtp(email , navigate) {

  

  return async (dispatch) => {

    try {
      const response = await apiConnector("POST", sendotp.SENDOTP_API, {email }  )

      console.log("SENDOTP API RESPONSE " , response)
      console.log(response.data.success)
      navigate("/verifyemail")
    } 
    catch (error) {
      console.log("SENDOTP API ERROR............", error)
    }



  }
}

export default sendOtp