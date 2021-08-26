import React, { useState } from "react";
import { WRITE_COMMENT, CREATE_COMMENT,SESSION_EXPIRED } from "../../../../utils/constants";
import API from "../../../../api"
import alertify from "alertifyjs";
import { useHistory } from "react-router-dom";
const AddComment = ({ postId }) => {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const [newComment, setNewComment] = useState("");
  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    const bodyParameters = { text: newComment };
    API
      .post(
        `${CREATE_COMMENT}${postId}`,
        bodyParameters
      )
      .then(() => {
        setNewComment("");
      })
      .catch((err) => {
        alertify.warning(err?.response?.data?.message);
        if(err?.response?.data?.message===SESSION_EXPIRED){
          history.push("/");
        }
      });
  };
  return (
    <>
      <div className="col-1 comments__userprofile">
        <img
          src={`${process.env.REACT_APP_PROFILE_PIC_URL}${user?._id}`}
          alt="profile"
          className="comments__profile"
        />
      </div>
      <form onSubmit={onCommentSubmitHandler} className="comments col-11">
        <input
          type="text"
          className="comments__new-comment"
          placeholder={WRITE_COMMENT}
          value={newComment}
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
          required
        />
      </form>
    </>
  );
};

export default AddComment;
