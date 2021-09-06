import React, { useState } from "react";
import {
  WRITE_COMMENT,
  CREATE_COMMENT,
  SESSION_EXPIRED,
  DEFAULT_USER_PROFILE,
} from "../../../../../utils/constants";
import API from "../../../../../utils/API";
import alertify from "alertifyjs";
import { useHistory } from "react-router-dom";
import "./AddComment.scss"
const AddComment = ({ postId }) => {
  let history = useHistory();
  const [newComment, setNewComment] = useState("");

  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    e.target[0].disabled = true;
    const bodyParameters = { text: newComment };
    API.post(`${CREATE_COMMENT}${postId}`, bodyParameters)
      .then(() => {
        setNewComment("");
      })
      .catch((err) => {
        alertify.warning(err?.response?.data?.message);
        if (err?.response?.data?.message === SESSION_EXPIRED) {
          history.push("/");
        }
      }).then(() => {
        e.target[0].disabled = false;
      });
  };
  return (
    <>
      <div className="add-comment">
        <div className="add-comment__left-container">
          <img
            src={DEFAULT_USER_PROFILE}
            alt="profile"
          />
        </div>
        <form onSubmit={onCommentSubmitHandler} className="comments add-comment__right-container">
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
      </div>

    </>
  );
};

export default AddComment;