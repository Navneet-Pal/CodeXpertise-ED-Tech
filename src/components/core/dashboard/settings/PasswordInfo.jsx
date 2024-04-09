import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { changePassword } from '../../../../services/operations/settingAPI';
import { useNavigate } from "react-router-dom"

export default function PasswordInfo() {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const {register,handleSubmit, formState: { errors },} = useForm();
    const [showpassword,setShowPassword] = useState(false)
    const [showconfirmpassword, setShowConfirmPassword] = useState(false)

    const submitPasswordForm = async (data) => {
        // console.log("password Data - ", data)
        try {
          await changePassword(token, data)
          navigate("/dashboard/my-profile")
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
        }
      }

  return (
    <form  onSubmit={handleSubmit(submitPasswordForm)}>
        
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <p className="text-lg font-semibold text-richblack-5">Password</p>

                {/*first row */}
                <div className='flex flex-col gap-5 lg:flex-row '>
                
                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstname" className='text-[14px] text-richblack-5'>Current Password</label>
                        <input
                            name='oldPassword'
                            id='oldPassword'
                            type={showpassword ? "text" : "password"}
                            placeholder="Enter Current Password"
                            
                            {...register("oldPassword", {required:true}) }

                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        <span onClick={()=>setShowPassword( (prev)=> !prev ) }
                        className='absolute right-2 top-10 cursor-pointer'>
                        {
                            showpassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ):(
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )
                        }
                        </span>
                        
                    </div>

                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="newPassword" className='text-[14px] text-richblack-5'>New Password</label>
                        <input
                            name='newPassword'
                            id='newPassword'
                            type={showconfirmpassword ? "text":"password"}
                            placeholder="Enter New Password"
                   
                            {...register("newPassword", {required:true}) }

                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        <span onClick={()=>setShowConfirmPassword( (prev)=> !prev ) }
                        className='absolute right-2 top-10 cursor-pointer'>
                        {
                            showconfirmpassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ):(
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )
                        }
                        </span>
                    
                    </div>

                </div>

                                
               
            </div>

            {/* saving button */}
            <div className='flex items-end gap-2 justify-end'>
                
                <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                    Cancel
                </button>

                <button className='flex items-center border border-yellow-50 bg-transparent bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'>
                Update</button>
            
            </div>
        
    </form>
  )
}
