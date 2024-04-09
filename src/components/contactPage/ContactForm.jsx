import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json'
import { apiConnector } from "../../services/apiConnector"
import { contactusEndpoint } from "../../services/apis"

export default function ContactForm() {

    const [loading,setLoading] = useState();
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    const submitContactForm = async (data) => {
        // console.log("Form Data - ", data)
        try {
          setLoading(true)
          const res = await apiConnector(
            "POST",
            contactusEndpoint.CONTACT_US_API,
            data
          )
        //   console.log("Email Res - ", res)
          setLoading(false)
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
          setLoading(false)
        }
      }

      useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            email: "",
            firstname: "",
            lastname: "",
            message: "",
            phoneNo: "",
          })
        }
      }, [reset, isSubmitSuccessful])

  return (
    <div className=' mt-10'>

    <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)} >
        {/*first row*/}
        <div className='flex gap-5 '>
        
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='firstname' className='text-[14px] text-richblack-5'> First Name </label>
                    <input 
                        name='firstname'
                        id='firstname'
                        type='text'
                        placeholder='Enter first name'
                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    {...register('firstname' ,  {required: true} ) }
                    
                    />
                    {
                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">Please enter your name</span>
                        )
                    }
                
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='lastname' className='text-[14px] text-richblack-5'> Last Name </label>
                    <input 
                        name='lastname'
                        id='lastname'
                        type='text'
                        placeholder='Enter last name'
                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    {...register('lastname' ,  {required: true} ) }
                    
                    />
                    {
                        errors.lastname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">Please enter your name</span>
                        )
                    }
                
            </div>
        
        </div>

        {/*second row*/}

        <div className="flex flex-col gap-2">
            <label htmlFor='email' className='text-[14px] text-richblack-5'> Email Address </label>
                <input 
                    name='email'
                    id='email'
                    type='email'
                    placeholder='Enter email address'
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                {...register('email' ,  {required: true} ) }
                
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please enter your email address</span>
                    )
                }
            
        </div> 
        

        {/*third row*/}

        <div className="flex flex-col gap-2">
         
            <label htmlFor='phonenumber' className='text-[14px] text-richblack-5'>Phone Number</label>

            <div className='flex gap-5 items-center'>
            
                <div className='flex w-[81px] flex-col gap-2'>
                    
                    <select
                    type='text'
                    name='dropdown'
                    id='dropdown'
                    {...register("countrycode" , {required:true} ) }
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    >
                    {
                        CountryCode.map((item,index)=>{
                            return(
                                <option key={index} value={item.code}>
                                    {item.code} -{item.country}
                                </option>
                            )
                        })
                    }
                    </select>

                </div>

                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                    <input
                        type="number"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="12345 67890"
                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        {...register("phoneNo", {
                            required: {
                            value: true,
                            message: "Please enter your Phone Number.",
                            },
                            maxLength: { value: 12, message: "Invalid Phone Number" },
                            minLength: { value: 10, message: "Invalid Phone Number" },
                        })}
                    />
                </div>

            </div>
         
        </div>       



        
        {/*fourth row*/}

        <div className="flex flex-col gap-2">
            <label htmlFor='message' className='text-[14px] text-richblack-5'> Message</label>
                <textarea 
                    name='message'
                    id='message'
                    type='text'
                    cols="30"
                    rows="7"
                    placeholder='Enter your message here'
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                {...register('message' ,  {required: true} ) }
                
                />
                {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please enter your Message.</span>
                    )
                }
            
        </div>
        

        {/*fifth row*/}

        <button
            disabled={loading}
            type="submit"
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
            ${
            !loading &&
            "transition-all duration-200 hover:scale-95 hover:shadow-none"
            }  disabled:bg-richblack-500 sm:text-[16px] `}
        >
            Send Message
        </button>

        
    
    
    </form>
    
    
    </div>
  )
}
