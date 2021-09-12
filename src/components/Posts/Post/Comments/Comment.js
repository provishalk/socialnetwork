import React,{useContext} from "react";
import { DEFAULT_USER_PROFILE } from "../../../../utils/constants";
import UserImgContext from "../../../../contextStore/UserImgContext";
import { getActualTime } from "../../../../utils/functions";
const Comment = ({ comment }) => {
  const { userImg } = useContext(UserImgContext);
  const userImgUrl = comment?.user?.imgUrl;
  const userProfile = userImgUrl ? userImgUrl : DEFAULT_USER_PROFILE;
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    <div className="comments-container">
      <div className="comments-container__left-container">
        <img
          src={comment?.user?._id === user?._id ? userImg : userProfile}
          alt="profile"
          className="comments__profile"
        />
      </div>
        <div className="comments-container__right-container comments__old-comments my-2">
          <div className="d-flex">
            <p className="comments__old-comments__user-name">
              {comment.user.name}
            </p>
            <span className="mx-1">·</span>
            <p className="comment__comment-time">{getActualTime(comment.createdAt)}</p>
          </div>
          <p>{comment.text}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
