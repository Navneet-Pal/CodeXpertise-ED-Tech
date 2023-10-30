import React from 'react'
import Sidebar from '../components/core/dashboard/Sidebar'
import MyProfile from '../components/core/dashboard/MyProfile'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='text-white flex '>

      <Sidebar/>

      <div className="mx-auto w-9/12 max-w-[1000px] py-10">
        <Outlet/>
      </div>

    </div>
  )
}

export default Dashboard