import React from 'react'
import Templete from '../components/core/AuthPage/Templete'
import image from "../assets/Images/signup.webp"

function Signup() {
    
  return (
    <div>

        <Templete 
            heading="Join the millions learning to code with StudyNotion for free"
            subheading="Build skills for today, tomorrow, and beyond."
            blueheading="Education to future-proof your career."
            formType="signup"
            image={image}
        />
    
    </div>
  )
}

export default Signup