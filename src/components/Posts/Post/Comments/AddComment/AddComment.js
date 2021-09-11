import React, { useState, useContext } from "react";
import {
  WRITE_COMMENT,
  CREATE_COMMENT,
  SESSION_EXPIRED
} from "../../../../../utils/constants";
import API from "../../../../../utils/API";
import alertify from "alertifyjs";
import { useHistory } from "react-router-dom";
import UserImgContext from "../../../../../contextStore/UserImgContext";
import "./AddComment.scss"
const AddComment = ({ postId }) => {
  let history = useHistory();
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { userImg } = useContext(UserImgContext);

  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
      });
  };

  const onEnterComment = (event) => {
    setNewComment(event.target.value);
  }

  return (
    <>
      <div className="add-comment">
        <div className="add-comment__left-container">
          <img
            src={userImg}
            alt="profile"
          />
        </div>
        <form onSubmit={onCommentSubmitHandler} className="comments add-comment__right-container">
          <input
            type="text"
            className="comments__new-comment"
            placeholder={WRITE_COMMENT}
            value={newComment}
            disabled={loading}
            onChange={onEnterComment}
            required
          />
        </form>
      </div>

    </>
  );
};

export default AddComment;
