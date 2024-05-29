import toast from "react-hot-toast"
import { studentEndpoints } from "../apis"
import {apiConnector} from '../apiConnector'
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice"
// const rkey= process.env.RAZORPAY_KEY

const { COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API,} = studentEndpoints

// Load the Razorpay SDK from the CDN
function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
}

export async function BuyCourse(token,courses,user_details, navigate,dispatch) {
    
    const toastId = toast.loading("Loading...")
    try {
      // Loading the script of Razorpay SDK
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
  
      if (!res) {
        toast.error(
          "Razorpay SDK failed to load. Check your Internet Connection."
        )
        return
      }
      
      // Initiating the Order in Backend
      const orderResponse = await apiConnector(
        "POST",COURSE_PAYMENT_API,{courses,},
        { Authorization: `Bearer ${token}`, }
      )
      
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message)
      }
      
      // Opening the Razorpay SDK
      const options = {
        key: 'rzp_test_t4LUM04KXw6wHc',
        currency: orderResponse.data.data.currency,
        amount: `${orderResponse.data.data.amount}`,
        order_id: orderResponse.data.data.id,
        name: "StudyNotion",
        description: "Thank you for Purchasing the Course.",
        image: rzpLogo,
        prefill: {
          name: `${user_details.firstname} ${user_details.lastname}`,
          email: user_details.email,
        },
        handler: function (response) {
          sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
          verifyPayment({ ...response, courses }, token, navigate, dispatch)
        },
      }
      console.log("options",options)
      const paymentObject = new window.Razorpay(options)
      console.log(paymentObject)
      console.log("yaha h dikka1t");
      paymentObject.open()
      console.log("yaha h dikka2t");
      
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        console.log("samasiya",response.error)
        console.log("ab samjh aaya")
       
      })
      console.log("yaha h dikkat3");
    } catch (error) {
      console.log("yaha h dikkat4");
      console.log("PAYMENT API ERROR............", error)
      toast.error("Could Not make Payment.")
    }
    toast.dismiss(toastId)
  }
  
  // Verify the Payment
  async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      })
  
      
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful. You are Added to the course ")
      navigate("/dashboard/enrolled-courses")
      dispatch(resetCart())
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}


  // Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
      await apiConnector(
        "POST",
        SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          amount,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    } catch (error) {
      console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
    }
}