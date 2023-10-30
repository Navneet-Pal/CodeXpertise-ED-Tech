import React from 'react'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'

export default function ProfileInfo() {

    const {user} = useSelector((state)=>state.profile)
    const {register,handleSubmit} = useForm();
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

  return (
    <form  >
        
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
                    
                    </div>

                </div>                
               
            </div>

            {/* saving button */}
            <div className='flex items-end gap-2 justify-end'>
                
                <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                    Cancel
                </button>

                <button className='flex items-center border border-yellow-50 bg-transparent bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'>
                Save</button>
            
            </div>
        
    </form>
  )
}
