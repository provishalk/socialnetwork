import React, { useState } from "react";
import "./Post.scss";
import { LIKED, NOT_LIKED, COMMENT } from "../../../labels/button";
import { LIKE_POST, DISLIKE_POST, DELETE_POST } from "../../../utils/constants";
import moment from "moment";
import axios from "axios";
import { Collapse, Dropdown } from "react-bootstrap";
import Comments from "./Comments/Comments";
const Post = ({ name, text, createdAt, likes, postId, postedBy, comments }) => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const onHandleLike = (event) => {
    event.target.src = event.target.src === LIKED ? NOT_LIKED : LIKED;
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}${
          event.target.src === LIKED ? LIKE_POST : DISLIKE_POST
        }${postId}`,
        config
      )
      .then()
      .catch((err) => console.error(err));
  };

  const postLikedByCurrentUser = likes.includes(user._id) ? LIKED : NOT_LIKED;

  const onDeletePostHandler = () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}${DELETE_POST}${postId}`,
        config
      )
      .then()
      .catch((err) => console.error(err));
  };

  return (
    <div className="row" key={postId}>
      <div className="col-1">
        <img
          src={`${process.env.REACT_APP_PROFILE_PIC_URL}${postedBy._id}`}
          alt="profile"
          className="addpost-container__img"
        />
      </div>
      <div className="col-11">
        <div className="post__user">
          <p className="post__user-name">{name}</p>
          <span>·</span>
          <p className="post__post-time">{moment(createdAt).fromNow(true)}</p>
          {postedBy._id === user._id ? (
            <Dropdown className="post__dropdown">
              <Dropdown.Toggle
                className="post__dropdown post__dropdowm-btn"
                variant="light"
                id="dropdown-basic"
                size="sm"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onDeletePostHandler}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <></>
          )}
        </div>
        <div>
          <p className="post__content">{text}</p>
        </div>
        <div className="d-flex">
          <div>
            <button className="post__buttons" onClick={onHandleLike}>
              <img src={postLikedByCurrentUser} alt="Like" />
            </button>
            <span className="post__buttons__like-count">{likes.length}</span>
          </div>

          <div className="post__buttons__comment">
            <button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="post__buttons"
            >
              <img src={COMMENT} alt="Like" />
            </button>
            <span className="post__buttons__like-count">{comments.length}</span>
          </div>
        </div>
        <Collapse in={open}>
          <div className="post__buttons__comment__user-comments">
            <Comments postId={postId} comments={comments} />
          </div>
        </Collapse>
      </div>
    </div>
  );
};
export default Post;
