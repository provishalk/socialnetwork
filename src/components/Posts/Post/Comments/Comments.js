import React from "react";
import { DEFAULT_USER_PROFILE } from "../../../../utils/constants";

const OldComments = ({ comment }) => {
  return (
    <>
    <div className="comments-container">
      <div className="comments-container__left-container">
        <img
          src={DEFAULT_USER_PROFILE}
          alt="profile"
          className="comments__profile mt-2"
        />
      </div>
        <div className="comments-container__right-container comments__old-comments my-2">
          <div className="d-flex">
            <p className="comments__old-comments__user-name">
              {comment.user.name}
            </p>
          </div>
          <p>{comment.text}</p>
        </div>
      </div>
    </>
  );
};

export default OldComments;
