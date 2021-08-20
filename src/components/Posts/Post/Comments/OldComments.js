import React from "react";

const OldComments = ({ comment }) => {
  return (
    <>
      <div className="col-1">
        <img
          src={`${process.env.REACT_APP_PROFILE_PIC_URL}${comment.user._id}`}
          alt="profile"
          className="comments__profile mt-2"
        />
      </div>
      <div className="col-11 d-flex">
        <div className="comments__old-comments my-2">
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
