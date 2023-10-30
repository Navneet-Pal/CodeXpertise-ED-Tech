import React from 'react'
import { contactDetails } from '../components/contactPage/contactpageDetails'
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
import ContactForm from '../components/contactPage/ContactForm'
import Footer from '../components/Common/Footer'

export default function () {
  return (
    <div className='text-white'>

        <section className='w-11/12 mt-20 max-w-maxContent mx-auto flex justify-between gap-10 items-start '>
        
            <div className="flex w-[40%] flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
            {
                contactDetails.map( (item,index)=>{
                    let Icon = Icon1[item.icon] || Icon2[item.icon] || Icon3[item.icon]
                    return(
                        <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
                            key={index}>

                            <div className="flex flex-row items-center gap-3"> <Icon size={25} />   <p className="text-lg font-semibold text-richblack-5">{item.heading}</p> </div>
                            <p className="font-medium">{item.description}</p>
                            <p className="font-semibold">{item.details}</p>
                        </div>

                    )
                })
            }
               
            </div>

            <div className="border w-[60%] border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col justify-start">
            
                <p className="text-4xl leading-10 font-semibold text-richblack-5">Got a Idea? We've got the skills. Let's team up</p>
                <p>Tell us more about yourself and what you're got in mind.</p>
                <ContactForm/>

            </div>

        </section>


        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        </div>

        <Footer/>
    
    </div>
  )
}
