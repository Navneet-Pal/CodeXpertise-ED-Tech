import React from 'react'
import CustomButton from './CustomButton'
import { TypeAnimation } from 'react-type-animation'



function TypingCode({heading,subheading,custombtn1, custombtn2,codeblock,position,colour,grad,gradPos}) {
  return (
    <div className={` relative flex ${position} my-20 justify-between gap-10`}>


        <div className={`absolute ${gradPos} w-96 h-64 rounded-full opacity-40 blur-2xl ${grad} `}></div> 
     

        <div className='text-white w-[50%] flex flex-col gap-8 '>

            <div className='text-4xl font-semibold'>{heading} </div>
            <p className='text-richblack-300 font-bold'>{subheading}</p>

            <div className='flex gap-7 mt-7'>
            
            <CustomButton children={custombtn1.text} active={custombtn1.active} linkto={custombtn1.linkto} />
            <CustomButton children={custombtn2.text} active={custombtn2.active} linkto={custombtn2.linkto} />

            </div>
        
        </div>

        <div className='text-white h-fit flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] border border-richblack-200' >

            <div className='flex flex-col text-center w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            
            <div className={`w-[90%] ${colour} flex flex-col font-bold font-mono pr-2`}>
            
            <TypeAnimation
                sequence={[ codeblock,2000,"" ]}
                
                speed={50}
                style={{ whiteSpace: "pre-line",
                display:"block", }}
                repeat={Infinity}
                omitDeletionAnimation={true}
        
            />
            
            </div>
        
        
        
        </div>

        
    
    </div>
  )
}

export default TypingCode