import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import * as Icons from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SidebarDiv from './SidebarDiv'
import { VscSignOut } from "react-icons/vsc"
import { useState } from 'react'
import {logout} from '../../../services/operations/authOperatins'
import ConfirmationModel from '../../Common/ConfirmationModel'

export default function Sidebar() {

  const {user} = useSelector((state) => state.profile);
  const [confirmationModel,setconfirmationModel] = useState();
  const dispatch = useDispatch();
  const navigate= useNavigate();

  return (
    <>
    <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
    
      <div className="flex flex-col">
      {
        sidebarLinks.map( (item,index) => {
          
          if(item.type && user?.accountType !== item.type) return null 
          return(
            <SidebarDiv item={item} key={index} iconName={item.icon}/>
          )
        })
      }
      </div>

      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

      <div className="flex flex-col">
      
        <SidebarDiv item={{ name: "Settings", path: "/dashboard/setting" }} iconName="VscSettingsGear" />

        <button className='flex items-center ml-6 gap-x-2 py-2 text-sm font-medium text-richblack-300'
        onClick={()=>setconfirmationModel( {
                heading: "Are you sure?",
                subheading: "You will be logged out of your account.",
                btn1text: "Logout",
                btn2text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setconfirmationModel(null),
        } ) }>
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>
      
      </div>

      

    </div>
    {confirmationModel && <ConfirmationModel modalData={confirmationModel} />}
    </>
  )
}
