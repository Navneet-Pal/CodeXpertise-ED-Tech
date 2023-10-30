import React, { Children } from 'react'
import { Link } from 'react-router-dom'

function CustomButton({children,active,linkto}) {
  return (
    <Link to={linkto}>
    <div className={`${active ?  "bg-yellow-50 text-black": "bg-richblack-800 text-white"} text-centert text-[13px]
    rounded-md font-bold hover:scale-95 transition-all duration-200 px-6 py-3 `}>
    
    
    {children}

    </div>
    </Link>
  )
}

export default CustomButton