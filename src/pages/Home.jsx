import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {IoIosArrowRoundForward} from "react-icons/io"
import HighlightText from '../components/core/homepage/HighlightText'
import CustomButton from '../components/core/homepage/CustomButton'
import banner from '../assets/Images/banner.mp4'
import TypingCode from '../components/core/homepage/TypingCode'
import OptionSection from '../components/core/homepage/OptionSection'
import SkillSection from '../components/core/homepage/SkillSection'
import PhotoSection from '../components/core/homepage/PhotoSection'
import Instructor from "../assets/Images/Instructor.png"
import Footer from '../components/Common/Footer'
import ReviewSlider from '../components/Common/ReviewSlider'
import {useSelector} from "react-redux"

function Home() {

    const {user} = useSelector((state)=> state.profile)
    // console.log(user)
    
    
  return (

    <div className='text-white '>
    
        <div className='mx-auto w-11/12 max-w-maxContent items-center justify-between'>
        
            <Link to={!user ? "/signup" : "/dashboard/my-profile"}>
                <div className='flex mt-14 items-center gap-1 bg-richblack-800 text-white w-52 justify-center h-10 rounded-3xl
                mx-auto'>
                    <p >Become an Instructor</p>
                    <IoIosArrowRoundForward/>
                </div>
            </Link>

            {/*section -- 1*/}

            

            <section className=' flex flex-col'>
            
                <div className='text-white '>
                    <div className='text-center text-4xl font-semibold mt-7'
                    >Empower Your Future with <HighlightText text={"Coding Skills"} /></div>
                    <p className='mt-4 w-11/12 text-center mx-auto text-lg font-bold text-richblack-300'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access 
                    to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                    <div className='flex justify-center items-center gap-9 mt-10 '>
                        <CustomButton children={"Learn More"} active={true} linkto={"/signup"}/>
                        <CustomButton children={"Book a Demo"} active={false} linkto={"/login"} />
                    </div>  
                    <div className='relative mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200' >
                    <video src={banner} muted autoPlay loop />
                    </div>
                
                </div>

                {/* typing section*/}

                    <div>

                    <TypingCode heading={ <div> Unlock your <HighlightText text={"coding potential"}/> with our online courses.  </div>} 
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    custombtn1 = { {text:"Try it Yourself" , active: true, linkto:"/signup"} }
                    custombtn2 = { {text:"Learn More" , active: false, linkto:"/signup"} }
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<>\n<h1><a href="/">Header</a>\n</h1>\n<nav>< href="/one">One</a> <a href="/two">Two\n</a> <a href="/three">Three</a>\n</nav>`}
                    postion={"lg:flex-row"}
                    colour={"text-yellow-200"}
                    grad={"bg-yellow-100"}
                    gradPos={" right-40 -top-7"}
                    />
                
                
                </div>

                <div>
                
                <TypingCode 
                heading={ <div className='flex flex-col'> <p>Start <HighlightText text={"coding in"}/> <p><HighlightText text={"seconds"} /></p></p>  </div>} 
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                custombtn1 = { {text:"Continue Lesson" , active: true, linkto:"/signup"} }
                custombtn2 = { {text:"Learn More" , active: false, linkto:"/signup"} }
                codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                position={"lg:flex-row-reverse"}
                colour={"text-white"}
                grad={"bg-blue-100"}
                gradPos={"top-0 left-0 "}
                />
                
                </div>

                <OptionSection/>

            </section>
        
        </div>
        

       

       {/*SECTION ---2*/}

       <div className='bg-pure-greys-5 text-richblack-700 '>


            <div className='bg_section_2_white h-[310px] -mt-40  '>
            
                <div className='flex justify-center items-end  gap-10 h-72'>
                        
                    <CustomButton children={"Explore Full Catalog"} active={true} linkto={"signup"} >
                        <div className='flex items-center gap-3' >
                            Explore Full Catalog
                            <IoIosArrowRoundForward/>
                        </div>
                    </CustomButton> 
                            
                    <CustomButton children={"Learn More"} active={false} linkto={"signup"} />
                        
                </div>
            
            </div>


            <div className='w-11/12 max-w-maxContent flex flex-col mx-auto mt-10'>
            
                <div className='flex justify-between'>
                
                    <p className='text-4xl font-semibold w-[45%]'>Get the skills you need for a <HighlightText text={"job that is in demand."} /></p>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <CustomButton children={"Learn More"} active={true} linkto={"/signup"} />
                    </div>
                
                </div>

                <SkillSection/>

                <PhotoSection/>
            
            
            </div>

       </div>

       {/*SECTION---3*/}

       <div className='w-11/12 mt-16 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
       
            <div className='flex gap-20 items-center' >

                <img src={Instructor}  alt="" className='shadow-white w-[50%] shadow-[-20px_-20px_0px_0px]'  />

                <div className='flex flex-col gap-10 items-start'>

                    <div className='text-4xl font-semobold w-[50%]'>
                        <p >Become an </p>
                        <HighlightText text={"instructor"} />
                    </div>

                    <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. 
                    We provide the tools and skills to teach what you love.</p>
                    
                    <CustomButton children={"Start Teaching Today"} active={true} linkto={"/signup"} >
                       <div className='flex gap-2 items-center text-[16px]'>
                            Start Teaching Today
                            <IoIosArrowRoundForward />
                       </div>
                    </CustomButton>
                    
                </div>
             
             </div>
             
             <p className='text-center text-4xl font-semobold mt-10'>Reviews from other learners</p>
             
             <ReviewSlider />

       </div>

       {/*FOOTER */}

       <Footer/>

    </div>
  )
}

export default Home