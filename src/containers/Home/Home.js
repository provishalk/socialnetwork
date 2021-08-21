import React, { useState, useEffect } from "react";
import AddPost from "../../components/Posts/AddPost/AddPost";
import Post from "../../components/Posts/Post/Post";
import "./Home.scss";
import axios from "axios";
import { GET_POSTS } from "../../utils/constants";
import io from "socket.io-client";
import _ from "lodash";
import alertify from "alertifyjs";
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';

const Home = ({ history }) => {
  const [posts, setPosts] = useState([]);
  const onAddNewPost = (newPost) => {
    setPosts((oldPosts) => [newPost, ...oldPosts]);
  };

  const onLikeHandler = (like) => {
    setPosts((oldPosts) => {
      let clonePosts = _.cloneDeep(oldPosts);
      _.forEach(clonePosts, (post) => {
        if (post._id === like._id) {
          post.likes = like.likes;
        }
      });
      return clonePosts;
    });
  };

  const onAddNewComment = (newComment) => {
    setPosts((oldPosts) => {
      let clonePosts = _.cloneDeep(oldPosts);
      _.forEach(clonePosts, (post) => {
        if (post._id === newComment._id) {
          post.comments = newComment.comments;
        }
      });
      return clonePosts;
    });
  };
  const onDeletePost = (deletedPost) => {
    setPosts((oldPosts) => {
      let clonePosts = _.cloneDeep(oldPosts);
      _.remove(clonePosts, { _id: deletedPost._id });
      return clonePosts;
    });
  };
  const onLogoutHandler = () =>{
    localStorage.clear();
    history.push("/");
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const socket = io.connect(`${process.env.REACT_APP_BASE_URL}`);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}${GET_POSTS}`, config)
      .then((res) => setPosts(res?.data?.data))
      .catch((err) => {
        console.log(err);
        alertify.warning(err.response.data.message);
        history.push("/");
        localStorage.clear();
      });

    socket.on("new-like", (event) => {
      onLikeHandler(event);
    });

    socket.on("new-post", (e) => {
      onAddNewPost(e);
    });

    socket.on("new-comment", (e) => {
      onAddNewComment(e);
    });

    socket.on("delete-post", (e) => {
      onDeletePost(e);
    });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-0 col-xl-4"></div>
          <div className="col col-md-6 col-xl-4 home__posts-container p-0">
            <div className="col m-auto  p-2 font-weight-bold home__cards">
              <h4>Home</h4>
            </div>
            <div className="col m-auto  p-2 font-weight-bold home__cards">
              <AddPost />
            </div>
            {posts.map((post) => {
              return (
                <div
                  className="col m-auto  p-2 font-weight-bold home__cards"
                  key={post._id}
                >
                  <Post
                    name={post?.user?.name}
                    text={post.text}
                    createdAt={post.createdAt}
                    likes={post?.likes}
                    postId={post?._id}
                    postedBy={post?.user}
                    comments={post.comments}
                  />
                </div>
              );
            })}
          </div>
          <div className="col-0 col-md-3 col-xl-4 d-flex home__logout">
            <div className="ml-auto">
              <OverlayTrigger
                placement='bottom'
                overlay={
                  <Tooltip>
                    Click me logout and redirect to login.
                  </Tooltip>
                }
              >
                <Button variant="light" onClick={onLogoutHandler}>Logout</Button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
