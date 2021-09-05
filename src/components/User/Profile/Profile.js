import React from 'react'
import { DEFAULT_USER_PROFILE } from '../../../utils/constants'
import "./Profile.scss"
const Profile = () => {
    return (
        <div className="user-profile">
            <div>
               <img src={DEFAULT_USER_PROFILE} alt="User" className="user-profile__img"/> 
            </div>
            <span className="user-profile__name">Vishal Kumar</span>
        </div>
    )
}

export default Profile
