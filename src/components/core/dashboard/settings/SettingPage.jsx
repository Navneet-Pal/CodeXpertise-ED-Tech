import React from 'react'
import ProfileInfo from './ProfileInfo'
import PasswordInfo from './PasswordInfo'
import DeleteAccount from './DeleteAccount'
import ChangeProfilePhoto from './ChangeProfilePhoto'

export default function SettingPage() {

  

  return (
    <div>
    
        <p className="mb-14 text-3xl font-bold text-richblack-5">Edit Profile</p>

        {/*Section---1   */}

        <ChangeProfilePhoto/>

        {/*Section---2   */}

        <ProfileInfo/>

        {/*Section---3   */}

        <PasswordInfo/>

        {/*Section---4   */}

        <DeleteAccount/>
    
    </div>
  )
}
