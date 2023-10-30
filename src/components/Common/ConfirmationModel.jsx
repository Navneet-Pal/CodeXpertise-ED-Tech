import React from 'react'

export default function ConfirmationModel({modalData}) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
    
        <div className='flex flex-col w-11/12  max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
        
            <p className="text-2xl font-semibold text-richblack-5">{modalData.heading}</p>

            <p className="mt-3 mb-5 leading-6 text-richblack-200">{modalData.subheading}</p>

            <div className='flex gap-4'>

                <button className='flex items-center border border-yellow-50 bg-transparent bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 '
                onClick={modalData.btn1Handler}>
                {modalData.btn1text}</button>

                <button className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                onClick={modalData.btn2Handler}>
                {modalData.btn2text}</button>
            
            </div>
        
        </div>
    
    
    </div>
  )
}
