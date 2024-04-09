import React from 'react'
import CustomButton from '../homepage/CustomButton'
import { useSelector } from 'react-redux'
import { RiEditBoxLine } from "react-icons/ri"

export default function MyProfile() {

    const {user} = useSelector((state) => state.profile)
    // console.log("user toh dekhe",user)

  return (
    <div className='text-white'>
        <div>

            <h2 className="mb-14 text-3xl font-medium text-richblack-5">My Profile</h2>

            <div className="my-10 flex flex-row justify-between items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12" >
            
                <div className='flex gap-5 items-center'>
                    <div className='w-20 h-20'><img src={user.image} className='rounded-full'/></div>
                    <div>
                        <p className="text-lg font-semibold text-richblack-5">
                            {user.firstname + " " + user.lastname}
                        </p>
                        <p className="text-sm text-richblack-300" >{user.email}</p>
                    </div>
                </div>
                
                <CustomButton active={true} linkto={"/dashboard/setting"} >
                    <div className='flex items-center gap-3 text-[17px]'>
                        Edit
                        <RiEditBoxLine />
                    </div>
                </CustomButton>
            
            </div>

            <div className="my-10  rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            
                <div className='flex justify-between items-center'>
                    <p className="text-lg font-semibold text-richblack-5">About</p>
                    <CustomButton active={true} linkto={"/dashboard/setting"} >
                        <div className='flex items-center gap-3 text-[17px]'>
                            Edit
                            <RiEditBoxLine />
                        </div>
                    </CustomButton>
                </div>

                <p className={`${ user.additionalDetails.about ? "text-richblack-5"
                      : "text-richblack-400"} text-sm font-medium`}
                >
                {user.additionalDetails.about || "Write Something About Yourself"}</p>
            
            </div>

            <div className="my-10 flex flex-col gap-3  rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            
                <div className='flex justify-between items-center'>
                    <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                    <CustomButton active={true} linkto={"/dashboard/setting"} >
                        <div className='flex items-center gap-3 text-[17px]'>
                            Edit
                            <RiEditBoxLine />
                        </div>
                    </CustomButton>
                </div>

                <div className='flex gap-60'>
                
                    <div className='flex flex-col gap-5'>

                        <div >
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p className="text-sm font-medium text-richblack-5">{user.firstname}</p>
                        </div>

                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>
                            <p className="text-sm font-medium text-richblack-5">{user.email}</p>
                        </div>
                        
                        <div >
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className="text-sm font-medium text-richblack-5">{user.additionalDetails.gender ? (user.additionalDetails.gender):("Add Gender")}</p>
                        </div>    

                    </div>



                    <div className='flex flex-col gap-5'>

                        <div >
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-medium text-richblack-5">{user.lastname}</p>
                        </div>

                        <div >
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className="text-sm font-medium text-richblack-5">{user.additionalDetails.contactNumber ? (user.additionalDetails.contactNumber):("Add contact Number")}</p>
                        </div>

                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">{user.additionalDetails.dateOfBirth ? (user.additionalDetails.dateOfBirth):("Add DOB")}</p>
                        </div>

                    </div>
                
                </div>

            
            </div>
        
        </div>
    </div>
  )
}



