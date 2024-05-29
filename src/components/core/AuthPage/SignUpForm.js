import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import {setSignupData} from '../../../slices/auth'
import { sendOtp } from '../../../services/operations/authOperatins';


function SignUpForm() {

    const [formData,setformData] = useState({firstname:"",lastname:"", email:"", password:"", confirmPassword:""});
    const [accountType , setaccountType] = useState("student");
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    function changeHandler(e){
        e.preventDefault();
        setformData( (prev) => ({...prev , [e.target.name] : e.target.value}));
       
    }

    function submitHandler(e){
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords Do not Match")
          return
        }

        const signupData = {...formData , accountType};
       
        
        dispatch(setSignupData(signupData));
        
        dispatch(sendOtp(formData.email , navigate))
       
        
        setformData({firstname:"",lastname:"", email:"", password:"", confirmPassword:""})
        setaccountType("student");

    }

  return (

    <div className='text-white'>


        <div  style={ { boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }}
           className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
    
            <div onClick={()=>{setaccountType("student")}}
             className={ ` ${accountType === "student" ? "bg-richblack-900 text-richblack-5": "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200 cursor-pointer `}>Student</div>
            
             <div onClick={()=>{setaccountType("instructor")}}
            className={ ` ${accountType === "instructor" ? "bg-richblack-900 text-richblack-5": "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200 cursor-pointer`}>Instructor</div>
        
        </div>


    
        <form onSubmit={submitHandler} className="flex w-full flex-col gap-y-4">
                        
            <div className='flex gap-x-4'>
            
                <label htmlFor='firstname'>First Name <sup className="text-pink-200">*</sup>
                <input
                required
                type="text"
                name="firstname"
                value={formData.firstname}d
                onChange={changeHandler}
                placeholder="Enter first name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
                    
                </label>

                <label htmlFor='lastname'>Last Name <sup className="text-pink-200">*</sup>
                    <input 
                    required
                    name='lastname'
                    type='text'
                    placeholder='Enter last name'
                    value={formData.lastname}
                    onChange={changeHandler}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" />
                </label>
            
            </div>

            <label htmlFor='email'>Email Address <sup className="text-pink-200">*</sup>
                <input 
                required
                name='email'
                id='email'
                type='email'
                placeholder='Enter email address'
                value={formData.email}
                onChange={changeHandler}
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" />
            </label>

            <div className='flex gap-x-4'>
            
                <label className='relative' htmlFor='password'>Create Password <sup className="text-pink-200">*</sup>
                    <input 
                    required
                    name='password'
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter password'
                    value={formData.password}
                    onChange={changeHandler}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-5" />
                    <span className="absolute right-3 bottom-3 cursor-pointer"
                         onClick={() => setShowPassword((prev) => !prev)}>
                        { !showPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF"/> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> }
                    </span>
                </label>

                <label className='relative' htmlFor='confirmPassword'>Confirm Password <sup className="text-pink-200">*</sup>
                    <input 
                    required
                    name='confirmPassword'
                    id='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" />
                    <span className='absolute right-3 cursor-pointer bottom-3'
                        onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        { !showConfirmPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF"/> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> }
                    </span>
                </label>
            
            </div>

            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                Create Account
            </button>

        </form>
    
    
    </div>
  )
}

export default SignUpForm