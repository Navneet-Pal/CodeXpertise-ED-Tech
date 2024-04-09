import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../Common/IconBtn';
import { updateDisplayPicture } from '../../../../services/operations/settingAPI';
import { useNavigate } from "react-router-dom"


export default function ChangeProfilePhoto() {

    const {user} = useSelector((state)=>state.profile)
    const { token } = useSelector((state) => state.auth)
    const fileInputRef = useRef();
    const [imageFile,setImageFile] = useState();
    const [previewSource,setPreviewSource] = useState();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate= useNavigate();
  

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

    const handleFileUpload = () => {
        try {
          
          setLoading(true)
          const formData = new FormData()
          formData.append("displayPicture", imageFile)
        //   console.log("formdata", formData,imageFile)
          dispatch(updateDisplayPicture(token, formData)).then(() => {
            setLoading(false)
           
          })
          navigate("/dashboard/my-profile")
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
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

                

                <IconBtn
                    text={loading ? "Uploading..." : "Upload"}
                    onclick={handleFileUpload}
                >
                    {!loading && (
                    <FiUpload className="text-lg text-richblack-900" />
                    )}
              </IconBtn>
            </div>

        </div>

    </div>
  )
}
