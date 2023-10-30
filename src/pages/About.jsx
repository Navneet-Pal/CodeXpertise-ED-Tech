import React from 'react'
import HighlightText from '../components/core/homepage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import {Stats} from "../data/aboutpageStats"
import LearningGrid from '../components/core/aboutpage/LearningGrid'
import ContactFormSection from '../components/core/aboutpage/ContactFormSection'
import Footer from '../components/Common/Footer'

export default function About() {
  return (
    <div className='text-white'>
    
        {/* section --- 1 */}
        <section className='bg-richblack-700 '>

            
            <div className='relative text-center w-11/12 max-w-maxContent mx-auto flex flex-col '>

                <div className='pt-20'>
                    <p className="mx-auto  text-4xl font-semibold lg:w-[70%]">
                        Driving Innovation in Online Education for a 
                        <HighlightText text={" Brighter Future"} />
                    </p>

                    <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[65%]">
                        Studynotion is at the forefront of driving innovation in online education. 
                        We're passionate about creating a brighter future by offering cutting-edge 
                        courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>

                <div className="sm:h-[70px] lg:h-[260px]"></div>

                <div className='absolute top-72 flex justify-between gap-5'>

                    <img src={BannerImage1} alt="Banner image" />
                    <img src={BannerImage2} alt="Banner image" />
                    <img src={BannerImage3} alt="Banner image" />
                
                </div>

            </div>
        
        
        </section>

        {/* section --- 2 */}
        <section className='mt-40  border-b border-richblack-700'>

            <div className='w-11/12 max-w-maxContent mx-auto  text-xl md:text-4xl font-semibold py-5 pb-20 text-center text-white'>
                We are passionate about revolutionizing the way we learn. Our innovative
                platform 
                <HighlightText text={" combines technology"} />, {""}
                <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
                    expertise 
                </span>
                {""} and community to create an {""}
                <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
                    unparalleled educational experience.
                </span>
            </div>
        
        
        </section>

        {/* section --- 3 */}
        <section>
        
            <div className='my-24 w-11/12 mx-auto max-w-maxContent flex flex-col gap-40 '>

                {/*one section */}
               <div className='flex justify-between items-center'>

                    <div className='flex flex-col lg:w-[50%] gap-10'>
                        <p className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                        Our Founding Story
                        </p>
                        <div className='gap-10 flex flex-col'>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>

                    </div> 

                    <div>
                        <img src={FoundingStory}
                            alt="Founding Story image"
                            className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                        />
                    </div>
               
               </div> 
               {/*one section ends */}

               {/*two section starts */}

                <div className='flex gap-20 justify-between'>

                    <div className='flex w-[40%] flex-col gap-7'>
                    
                        <p className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Vision</p>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    
                    </div>

                    <div className='w-[40%] flex flex-col gap-7'>
                    
                        <p className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">Our Mission</p>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    
                    </div>
                
                </div>
               {/*two section ends */}

            </div>
        
        </section>

        {/*section --4 */}
        <section className='bg-richblack-700 py-10'>
        
            <div className='w-11/12 max-w-maxContent mx-auto flex justify-around text-center'>
                {
                    Stats.map( (item,index) => {
                        return (
                            <div key={index}>
                                <p className="text-[30px] font-bold text-richblack-5">{item.count}</p>
                                <p className="font-semibold text-[16px] text-richblack-500">{item.label}</p>
                            </div>
                        )
                    })
                }
            </div>

        </section>

        {/*section --5 */}
        <section className='my-20'>
                
            <LearningGrid />
            <ContactFormSection />
            
        </section>

        {/*section --6 */}

        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        </div>

        {/*section --7 */}

        <Footer/>
        
    
    </div>
  )
}
