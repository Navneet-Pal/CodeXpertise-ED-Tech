import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {   logo:Logo1,
        heading:"Leadership",
        subheading:"Fully committed to the success company"
    },
    {
        logo:Logo2,
        heading:"Responsibility",
        subheading:"Students will always be our top priority"
    },
    {
        logo:Logo3,
        heading:"Flexibility",
        subheading:"The ability to switch is an important skills"
    },
    {
        logo:Logo4,
        heading:"Solve the problem",
        subheading:"Code your way to a solution"
    }
]

function SkillSection() {

   


  return (
    <div className='flex my-20'>
    
        <div className='flex flex-col  gap-20 w-[45%]'>
            {
                timeline.map((item,index) => {
                    return(
                        <div key={index}
                        className='flex gap-8' >
                            <div className='bg-white w-10 rounded-full h-10 flex items-center justify-center'>
                                <img src={item.logo}/>
                            </div>
                            <div>
                                <p className='font-semibold text-[18px]'>{item.heading}</p>
                                <p className='text-base'>{item.subheading}</p>
                            </div>
                        </div>
                    )
                })
            }
        
        </div>
      
        <div className='relative shadow-blue-200  shadow-[0px_0px_30px_0px] h-[29rem] '>
        
            
                <img src={timelineImage} alt="timelineImage" 
                className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-[99.99%] w-full '  />

                <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-9 
                left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                
                    <div className='flex flex-row gap-10 items-center border-r border-caribbeangreen-300 px-14'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>

                    <div className='flex gap-10 items-center px-14'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>TYpe of Courses</p>
                    </div>
                
                </div>
         

        </div>
    
    
    
    </div>
  )
}

export default SkillSection