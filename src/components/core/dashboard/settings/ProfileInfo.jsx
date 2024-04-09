import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from '../../../../services/operations/settingAPI'
import IconBtn from '../../../Common/IconBtn'

export default function ProfileInfo() {

    const {user} = useSelector((state)=>state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    const submitProfileForm = async (data) => {
        
        // console.log("Form Data - ", data)
        try {
           
          dispatch(updateProfile(token, data))
          navigate("/dashboard/my-profile")
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
        }
      }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
        
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <p className="text-lg font-semibold text-richblack-5">Profile Information</p>

                {/*first row */}
                <div className='flex flex-col gap-5 lg:flex-row '>
                
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstname" className='text-[14px] text-richblack-5'>First Name</label>
                        <input
                            name='firstname'
                            id='firstname'
                            type='text'
                            placeholder="Enter first name"
                            defaultValue={user.firstname}
                            {...register("firstname", {required:true}) }

                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        {errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your first name.
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastname" className='text-[14px] text-richblack-5'>Last Name</label>
                        <input
                            name='lastname'
                            id='lastname'
                            type='text'
                            placeholder="Enter last name"
                            defaultValue={user.lastname}
                            {...register("lastname", {required:true}) }

                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                         {errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your last name.
                            </span>
                        )}
                    </div>

                </div>

                {/*second row */}
                <div className='flex flex-col gap-5 lg:flex-row '>
                
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstname" className='text-[14px] text-richblack-5'>Date of Birth</label>
                        <input
                            name='dateOfBirth'
                            id='dateOfBirth'
                            type='date'
                            defaultValue={user.additionalDetails.dateOfBirth}
                            {...register("dateOfBirth", {
                                required:{
                                    value: true, 
                                    message:'please enter your Date of Birth'  } ,
                                max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    }, }
                           ) }

                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        {errors.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="gender" className='text-[14px] text-richblack-5'>Gender</label>
                        <select
                            name='gender'
                            id='gender'
                            type='text'
                            defaultValue={user.additionalDetails.gender}
                            {...register("gender", {required:true}) }
                                
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        >
                            {
                                genders.map((item,index)=>{
                                    return(
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.gender && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your Date of Birth.
                            </span>
                        )}
                    
                    </div>

                </div>
                
                {/*third row */}
                <div className='flex flex-col gap-5 lg:flex-row '>
                
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="contactNumber" className='text-[14px] text-richblack-5'>Contact Number</label>
                        <input
                            name='contactNumber'
                            id='contactNumber'
                            type='number'
                            placeholder="Enter Contact Number"
                            defaultValue={user.additionalDetails.contactNumber}
                            {...register("contactNumber", {required: {
                                value: true,
                                message: "Please enter your Contact Number.",
                              },
                              maxLength: { value: 12, message: "Invalid Contact Number" },
                              minLength: { value: 10, message: "Invalid Contact Number" },
                            }) }

                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        {errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.contactNumber.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="about" className='text-[14px] text-richblack-5'>About</label>
                        <input
                            name='about'
                            id='about'
                            type='text'
                            placeholder="Enter Bio Details"
                            defaultValue={user.additionalDetails.about}
                            {...register("about", {required:true}) }

                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        {errors.about && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your About.
                            </span>
                        )}
                    
                    </div>

                </div>                
               
            </div>

            {/* saving button */}
            <div className='flex items-end gap-2 justify-end'>
                
                <button onClick={() => {
                    navigate("/dashboard/my-profile")
                    }} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                    Cancel
                </button>

                <IconBtn type="submit" text="Save" />
            
            </div>
            
        
    </form>
  )
}
