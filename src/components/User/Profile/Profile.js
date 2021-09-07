import React, { useState } from 'react'
import { DEFAULT_USER_PROFILE } from '../../../utils/constants'
import "./Profile.scss"
import AddProfileImage from "../../../components/User/AddProfileImage/AddProfileImage";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [modalShow, setModalShow] = useState(false);
  const userProfile = process.env.REACT_APP_BASE_URL + "/" + user.imgUrl;
  return (
    <div className="user-profile">
      <img src={user.imgUrl ? userProfile : DEFAULT_USER_PROFILE} alt="User"
        className="user-profile__img"
        onClick={() => setModalShow(true)} />
      <span className="user-profile__name">Vishal Kumar</span>
      <AddProfileImage
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default Profile
