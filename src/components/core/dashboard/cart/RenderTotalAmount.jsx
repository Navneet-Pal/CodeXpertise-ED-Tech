import React from 'react'
import { useSelector } from 'react-redux'

function RenderTotalAmount() {

    const {total, cart} = useSelector((state) => state.cart);


    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);
        //TODO: API integrate -> payment gateway tak leke jaegi

  return (
    <div>

        <p>Total:</p>
        <p>Rs {total}</p>

        <button onClick={handleBuyCourse} className='w-full flex items-center justify-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'>
        Buy Now</button>
        
    </div>
  )
}
}

export default RenderTotalAmount