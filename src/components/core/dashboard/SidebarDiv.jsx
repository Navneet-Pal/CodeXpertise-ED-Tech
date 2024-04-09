import React from 'react'
import * as Icons from 'react-icons/vsc'
import { Link, useLocation } from 'react-router-dom'

export default function SidebarDiv({item,iconName}) {

    let Icon = Icons[iconName] 
    const location = useLocation()

  return (
    <Link to={item.path} className={`relative flex px-6 py-2 my-1  items-center text-sm font-medium  
    ${location.pathname === item.path ? "bg-yellow-800 text-yellow-50":"bg-opacity-0 text-richblack-300" } `}>

      <span
        className={`absolute -left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          location.pathname === item.path ? "opacity-100" : "opacity-0"
        }`}
      ></span>

        <div className='flex items-center gap-x-2 '>

            <Icon className="text-lg"/>
            <p>{item.name}</p>

        </div>
    </Link>
  )
}
