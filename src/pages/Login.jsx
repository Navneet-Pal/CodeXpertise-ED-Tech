import React from 'react'
import Templete from '../components/core/AuthPage/Templete'
import image from '../assets/Images/login.webp'

function Login() {
  return (
    <div>
    
        <Templete 
            heading="Welcome Back"
            subheading="Build skills for today, tomorrow, and beyond."
            blueheading="Education to future-proof your career."
            FormType="login"
            image={image}
         />
    
    </div>
  )
}

export default Login