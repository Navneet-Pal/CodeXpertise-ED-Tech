import {React,useState} from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText';
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

function OptionSection() {
    
    const [tab,settab] = useState("Free");
    const [course,setcourse] = useState(HomePageExplore[0].courses);
    const [currentCard,setcurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    function setvalues(val){
        settab(val);
        const res = HomePageExplore.filter((item) => item.tag === val)[0].courses;
        setcourse(res);
        setcurrentCard(res[0].heading);
    }


  return (
    <div className='flex-col' >

        <div>
            
            <div className="text-4xl font-semibold text-center mt-10">Unlock the <HighlightText text={"Power of Code"}/> </div>
            <p className="text-center text-richblack-300 text-lg font-semibold mt-1">Learn to Build Anything You Can Imagine</p>
           

        </div>
        
        <div className='mx-auto mt-4 flex gap-6 bg-richblack-800 rounded-3xl py-1 px-1 w-[62.4%]'>
        
            {
                HomePageExplore.map( (ele,index) => {
                    return (
                        <div key={index} onClick={()=>setvalues(ele.tag)}
                        className={`cursor-pointer ${tab===ele.tag ? "bg-richblack-900" : "bg-richblack-700" }
                        px-7 font-medium py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}>
                            {ele.tag}
                        </div>
                    )
                })
            }
        
        </div>

        <div className='flex justify-between mt-8'>
        
            {
                course.map( (item, index) => {
                    return(
                        <div key={index}
                        onClick={() => setcurrentCard(item.heading)}
                        className={`w-[360px] lg:w-[30%] ${currentCard === item.heading ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50": "bg-richblack-800"}  text-richblack-25 h-[300px] box-border cursor-pointer`}>

                            <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6">
                            
                                <p className={` ${currentCard === item.heading && "text-richblack-800"} font-semibold text-[20px]`}>{item.heading}</p>

                                <p className="text-richblack-400">{item.description}</p>
                                
                            </div>

                            <div className={`flex justify-between ${currentCard === item.heading ? "text-blue-300" : "text-richblack-300" } px-6 py-3 font-medium`}>
                                <div className="flex items-center gap-2 text-[16px]">
                                    <HiUsers />
                                    <p>{item.level}</p>
                                </div>   
                            
                                <div className="flex items-center gap-2 text-[16px]">
                                    <ImTree />
                                    <p>{item.lessionNumber} Lesson</p>
                                </div>
                            
                            </div>
                        
                        </div>
                    )
                })
            }

        </div>
    


    </div>
  )
}

export default OptionSection