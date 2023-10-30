import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi"
import CustomButton from '../../homepage/CustomButton'
import { useSelector } from 'react-redux';


export default function ChangeProfilePhoto() {

    const {user} = useSelector((state)=>state.profile)
    const fileInputRef = useRef();
    const [imageFile,setImageFile] = useState();
    const [previewSource,setPreviewSource] = useState();
  

    const handleClick = () => {
        fileInputRef.current.click()
        
    }

    const handleFileChange = (e)=>{
        const file= e.target.files[0]
        if(file){
            setImageFile(file);
            previewFile(file)
        }
    }

    const previewFile = (file) =>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setPreviewSource(reader.result)
        }
    }

    useEffect(()=>{
        if(imageFile){
            previewFile(imageFile)
        }
    },[imageFile])

  return (
    <div className="my-10 flex flex-row gap-3 items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        
        <img src={previewSource || user.image} className='h-20 w-20 rounded-full' />

        <div className='flex flex-col gap-2'>
        
            <p className="space-y-2">Change Profile Photo</p>

            <div className="flex flex-row gap-3">

                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className='hidden'
                    accept="image/png, image/gif, image/jpeg"
                />

                <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    onClick={handleClick}>
                    Select
                </button>

                

                <CustomButton active={true} >
                    <div className='flex gap-2 items-center'>
                        Upload 
                        <FiUpload fontSize={18} /> 
                    </div>
                </CustomButton>  

            </div>

        </div>

    </div>
  )
}
