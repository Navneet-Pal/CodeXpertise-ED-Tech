import React, { useState } from 'react'
import frameImg from '../../../assets/Images/frame.png'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { useSelector } from "react-redux"

function Templete({heading,subheading,blueheading,formType,image}) {

    const { loading } = useSelector((state) => state.auth)


  return (
    <div className='text-richblack-800 w-11/12 max-w-maxContent mx-auto '>
    
       
            {
                loading ? (<div className="spinner"></div>): (
                    <div className='flex justify-between my-14 items-center  '>

                        <div className=' max-w-[450px]'>
            
                            <p className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{heading}</p>
                            <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">{subheading}</p>
                            <p className="mb-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100">{blueheading}</p>

                            {formType === "signup" ? <SignUpForm /> : <LoginForm />}
            
                        </div>


                        <div className='relative  mx-auto max-w-[450px] md:mx-0'>
                        
                            <img src={image} 
                                alt="Pattern"
                                width={558}
                                height={504}
                                loading="lazy" 
                                className="absolute -top-4 right-4 z-10"
                            />

                            <img src={frameImg} 
                                alt="Students"
                                width={558}
                                height={504}
                                loading="lazy"
                            />
                        
                        </div>  
                    
                    
                    </div>
                )
            }






     
    
    
    </div>
  )
}

export default Templete