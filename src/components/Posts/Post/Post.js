import React, { useState } from "react";
import moment from "moment";
import { Collapse, Dropdown } from "react-bootstrap";
import { BsChat } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';

import Comments from "./Comments/Comments";

import { LIKE_POST, DISLIKE_POST, DELETE_POST } from "../../../utils/constants";
import API from "../../../utils/API";

import "./Post.scss";
import { DELETE } from "../../../labels/button";

const Post = ({ name, text, createdAt, likes, postId, postedBy, comments }) => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); //
  const [postLikedByCurrentUser, setPostLikedByCurrentUser] = useState(likes.includes(user?._id) ? <FcLike key={1} /> : <AiOutlineHeart key={2} />)
 
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
    <div className="row" key={postId}>
      <div className="col-1">
        <img
          src={`${process.env.REACT_APP_PROFILE_PIC_URL}${postedBy._id}`}
          alt="profile"
          className="addpost-container__img"
        />
      </div>
      <div className="col-10 col-sm-10 col-lg-11 addpost-container__col-adjustment">
        <div className="post__user">
          <p className="post__user-name">{name}</p>
          <span>·</span>
          <p className="post__post-time">{moment(createdAt).fromNow(true)}</p>
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
          <p className="post__content">{text}</p>
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
