import React from 'react'
import CustomButton from '../components/core/homepage/CustomButton'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPasswordResetToken } from '../services/operations/authOperatins'

function ForgotPassword() {

    const[email,setEmail] = useState("");
    const[emailSent,setEmailSent]=useState(false)
    const dispatch = useDispatch();
    
    function changeHandler(e){
        e.preventDefault();
        setEmail(e.target.name=e.target.value)

    }

    function submitHandler(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }


  return (
    <div className='text-white'>

        <div className='w-96 mx-auto mt-44'>
        
            <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{emailSent ? "Check email" : "Reset your password" }</h2>
            <p className="my-4 text-[1.125rem] leading-[1.625rem] font-sem text-richblack-100">{emailSent ? `We have sent the reset email to ${email}` : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" }</p>

            <form onSubmit={submitHandler}>
            
                { !emailSent && <label htmlFor='emaill'><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
                <input
                    name='emaill'
                    id='emaill'
                    type='email'
                    value={email}
                    onChange={changeHandler}
                    placeholder='Enter your email address'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    required

                /> </label>}

                <button type="submit"
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                    {emailSent ? "Resend Email" : "Reset Password"}
                </button>

                <Link to={"/login"}> <p className='flex items-center gap-1 mt-5'><BiArrowBack />Back to login</p> </Link>
               
            
            </form>
        
        </div>
    
    </div>
  )
}

export default ForgotPassword