import React, { useState, useContext } from 'react';
import AddProfileImage from "../../../components/User/AddProfileImage/AddProfileImage";
import UserImgContext from '../../../contextStore/UserImgContext';
import "./Profile.scss"
const Profile = () => {
  const [modalShow, setModalShow] = useState(false);
  const { userImg } = useContext(UserImgContext);
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div className="user-profile">
      <img
        src={userImg}
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
