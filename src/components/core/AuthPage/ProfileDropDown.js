import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import {logout} from '../../../services/operations/authOperatins'

function ProfileDropDown() {

  const {user} = useSelector((state) => state.profile)
  const [open, setOpen] = useState(false)
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const refElement = useRef();

  useEffect( ()=>{

      let handler = (e) => {

        if (!refElement.current || refElement.current.contains(e.target)) {
          return;
        }
        setOpen(false);
        
      };

      document.addEventListener("mousedown" , handler);
      document.addEventListener("touchstart" , handler);
      return ()=>{
        document.removeEventListener("mousedown", handler);
        document.removeEventListener("touchstart", handler);
      }
  }, [refElement] );
  

  return (
    <div className='text-white relative'>
    
     <div className='flex gap-1 justify-center items-center cursor-pointer'
      onClick={ ()=>{ setOpen(!open ) }  } >

        <img src={user.image}
          alt={`profile-${user.firstName}`} 
          className='rounded-full object-cover w-[33px] aspect-square'
        /> 
           
        <AiOutlineCaretDown className="text-sm text-richblack-100" />

     </div>

     {
      open &&
      <div className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
        onClick={(e) => e.stopPropagation()}
        ref={refElement}
        >

        <Link to={"dashboard/my-profile"} onClick={ () => setOpen(false) } >
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
            <VscDashboard className="text-lg" />
            Dashboard
          </div>
        </Link>

        
        <div onClick={ () => { dispatch( logout(navigate))
           setOpen(false) } } 
           className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25' >

          <VscSignOut className="text-lg" />
          Logout
        </div>
       
          
        
      </div>
     }


    
    </div>
  )
}

export default ProfileDropDown