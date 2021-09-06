import React, { useState, useEffect } from "react";
import { Collapse, Dropdown } from "react-bootstrap";
import { BsChat } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';
import Comments from "./Comments/Comment";
import {
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
  DEFAULT_USER_PROFILE
} from "../../../utils/constants";
import API from "../../../utils/API";
import "./Post.scss";
import { DELETE } from "../../../labels/button";
import { getActualTime } from "../../../utils/functions";

const Post = ({ name, text, createdAt, likes, postId, postedBy, comments }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState(text);
  const [postLikedByCurrentUser, setPostLikedByCurrentUser] = useState(likes.includes(user?._id) ? <FcLike key={1} /> : <AiOutlineHeart key={2} />)
  const [shrinkText, setShrinkText] = useState(false);
  useEffect(() => {
    if (postContent.length > 300) {
      setPostContent(postContent.substring(0, 250));
      setShrinkText(true);
    }
  }, [])
  const onHandleLike = (event) => {
    setPostLikedByCurrentUser(postLikedByCurrentUser.key === "1" ? <AiOutlineHeart key={2} /> : <FcLike key={1} />);
    API
      .get(
        `${postLikedByCurrentUser.key === "1" ? DISLIKE_POST : LIKE_POST
        }${postId}`
      )
      .then()
      .catch((err) => console.error(err));
  };

  const onDeletePostHandler = () => {
    API
      .delete(
        `${DELETE_POST}${postId}`,
      )
      .then()
      .catch((err) => console.error(err));
  };

  return (
    <div className="post-container" key={postId}>
      <div className="post-container__left-container">
        <img
          src={DEFAULT_USER_PROFILE}
          alt="profile"
          className="addpost-container__img"
        />
      </div>
      <div className="post-container__right-container">
        <div className="post__user">
          <p className="post__user-name">{name}</p>
          <span className="mx-1 post__dot">·</span>
          <p className="post__post-time">{getActualTime(createdAt)}</p>
          {postedBy._id === user?._id ? (
            <Dropdown className="post__dropdown">
              <Dropdown.Toggle
                className="post__dropdown post__dropdowm-btn"
                variant="light"
                id="dropdown-basic"
                size="sm"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onDeletePostHandler}>
                  {DELETE}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <></>
          )}
        </div>
        <div>
          <p className="post__content">
            {postContent}
            {
              shrinkText &&
              <span
                className="post__expend-text"
                onClick={() => { 
                  setPostContent(text);
                  setShrinkText(false);
                   }}>
                ...
              </span>
            }

          </p>
        </div>
        <div className="d-flex">
          <div>
            <button className="post__buttons" onClick={onHandleLike}>
              {postLikedByCurrentUser}
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
              <BsChat />
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
