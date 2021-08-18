import React from 'react';
import "./Post.scss";
import { LIKED, NOT_LIKED } from '../../../labels/button';
import { LIKE_POST, DISLIKE_POST } from '../../../utils/constants';
import moment from 'moment';
import axios from 'axios';

const Post = ({ name, text, createdAt, likes, _id, postedBy }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const onHandleLike = event => {
        event.target.src = event.target.src === LIKED ? NOT_LIKED : LIKED;
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios
            .get(`${process.env.REACT_APP_BASE_URL}${event.target.src === LIKED ? LIKE_POST : DISLIKE_POST}${_id}`, config)
            .then()
            .catch(err => console.error(err));
    }

    const postLikedByCurrentUser = likes.includes(user._id) ? LIKED : NOT_LIKED;

    return (
        <div className="row" key={_id}>
            <div className="col-1">
                <img src={`${process.env.REACT_APP_PROFILE_PIC_URL}${postedBy._id}`} alt="profile" className="addpost-container__img" />
            </div>
            <div className="col-11">
                <div className="post__user">
                    <p className="post__user-name">{name}</p>
                    <span>·</span>
                    <p className="post__post-time">{moment(createdAt).fromNow(true)}</p>
                </div>
                <div>
                    <p className="post__content">{text}</p>
                </div>
                <div className="d-flex">
                    <button className="post__like" onClick={onHandleLike}>
                        <img src={postLikedByCurrentUser} alt="Like" />
                    </button>
                    <span className="post__like__like-count">{likes.length}</span>
                </div>
            </div>
        </div>
    )
}
export default Post
