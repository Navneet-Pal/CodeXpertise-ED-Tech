import React from 'react'
import { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authOperatins';

function UpdatePassword() {

    const [resetDone, setResetDone]=useState(false);
    const [formData,setFormData] = useState({password:'', confirmPassword:''});
    const dispatch = useDispatch();
    const location= useLocation();

    function changeHandler(e){
        e.preventDefault();
        setFormData((prev)=>({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    function submitHandler(e){
        e.preventDefault();
        const { password, confirmPassword } = formData;
        const token = location.pathname.split("/").at(-1)
        // console.log(token)
        // console.log(password) 
        // console.log(confirmPassword) 
        dispatch(resetPassword(password,confirmPassword,token,setResetDone))
    }


  return (
    <div className='text-white'>
    
        <div className='w-96 mx-auto mt-44'>
            
            <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{resetDone ? "Reset Complete!" : "Choose New Password" }</h2>
            <p className="my-4 text-[1.125rem] leading-[1.625rem] font-sem text-richblack-100">{resetDone ? `All done! We have sent an email to  to confirm` : "Almost done. Enter your new password and youre all set." }</p>

            <form onSubmit={submitHandler}>
            
                { !resetDone &&
                    <div className='flex flex-col gap-5'>
                        <label htmlFor='password'><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
                        <input
                            name='password'
                            id='password'
                            type='password'
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder='Enter new password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            required
        
                        /> </label>

                        <label htmlFor='confirmPassword'><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sup className="text-pink-200">*</sup></p>
                        <input
                            name='confirmPassword'
                            id='confirmPassword'
                            type='password'
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            placeholder='Enter your confirm password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            required
        
                        /> </label>

                    </div> 
                }

                {
                    resetDone? (
                        <Link to={"/login"}><button
                        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                            Return to login
                    </button></Link>
                    ):(
                        <button type="submit"
                            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                Reset Password
                        </button>
                    )
                }


                <Link to={"/login"}> <p className='flex items-center gap-1 mt-5'><BiArrowBack />Back to login</p> </Link>
            
            
            </form>

        </div>
    
    </div>
  )
}

export default UpdatePassword