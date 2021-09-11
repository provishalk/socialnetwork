import React, { useState } from 'react';
import "./Profile.scss"
import AddProfileImage from "../../../components/User/AddProfileImage/AddProfileImage";
import { getUserImgFromLocalStorage } from '../../../utils/functions';
const Profile = ({ userImg }) => {
  const [modalShow, setModalShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="user-profile">
      <img
        src={getUserImgFromLocalStorage()}
        alt="User"
        className="user-profile__img"
        onClick={() => setModalShow(true)} />
      <span className="user-profile__name">{user.name}</span>
      <AddProfileImage
        show={modalShow}
        onHide={() => {
          setModalShow(false)
        }}
      />
    </div>
  )
}

export default Profile
