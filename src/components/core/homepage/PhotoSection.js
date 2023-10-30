import React from 'react'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import HighlightText from './HighlightText'
import CustomButton from './CustomButton'

function PhotoSection() {
  return (
    <div className='flex flex-col items-center my-20'>

        <p className='text-4xl font-semibold text-center'>Your swiss knife for <HighlightText text={"learning any language"} /> </p>
        <p className='mt-3 text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>Using spin making learning multiple languages easy. with 20+ languages 
        realistic voice-over, progress tracking, custom schedule and more.</p>

        <div className='flex justify-center mt-5'>

            <img src={know_your_progress} className='object-contain -mr-32 ' />
            <img src={compare_with_others} className='object-contain  '/>
            <img src={plan_your_lesson} className='object-contain -ml-36' />
        
        </div>

        <div>
        <CustomButton children={"Learn More"} active={true} linkto={"/signup"} />
        </div>
    
    </div>
  )
}

export default PhotoSection
