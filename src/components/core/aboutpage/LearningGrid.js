import React from 'react'
import HighlightText from '../homepage/HighlightText'
import CustomButton from '../homepage/CustomButton'
import { LearningGridArray } from '../../../data/aboutpageStats'

export default function LearningGrid() {
  return (
    <div>
    
        <div className='w-11/12 max-w-maxContent mx-auto grid grid-cols-4 grid-rows-2'>

            {
                LearningGridArray.map( (item,index)=>{
                    return(
                        <div key={index} 
                            className={`${item.order < 0 ? "col-span-2":"col-span-1" } 
                            ${item.order % 2 == 1 ? "bg-richblack-700" : item.order % 2=== 0 ? "bg-richblack-800" : "bg-transparent" } 
                            ${item.order === 3 && "col-start-2"} h-[294px] `}>
                        {
                            item.order < 0 ? (
                                
                                <div className='xl:w-[90%] flex flex-col gap-3 items-start'>
                                    <p className="text-4xl font-semibold ">{item.heading}</p>
                                    <HighlightText text={item.highlightText} />
                                    <p className="text-richblack-300 font-medium">{item.description}</p>
                                    <CustomButton children={item.BtnText} active={true} linkto={item.BtnLink} />
                                </div>

                            ) : (
                                <div className="p-8 flex flex-col gap-8">
                                    <p className="text-richblack-5 text-lg">{item.heading}</p>
                                    <p className="text-richblack-300 font-medium">{item.description}</p>
                                
                                </div>
                            )
                        }

                        
                        </div>
                    )
                } )
            }






            


        
        </div>
    
    </div>
  )
}
