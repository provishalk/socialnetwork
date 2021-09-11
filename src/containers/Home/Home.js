import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import io from "socket.io-client";
import _ from "lodash";
import alertify from "alertifyjs";
import AddPost from "../../components/Posts/AddPost/AddPost";
import Post from "../../components/Posts/Post/Post";
import API from "../../utils/API";
import { GET_POSTS } from "../../utils/constants";
import { LOGOUT } from "../../labels/button";
import { HOME } from "../../labels/headings";
import Profile from "../../components/User/Profile/Profile";
import PostLoading from "../../components/Posts/PostLoading/PostLoading";
import "./Home.scss";
const Home = ({ history }) => {
  const DUMMY_ARRAY = [1, 2, 3, 4, 5, 6];
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const onLogoutHandler = () => {
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    const socket = io.connect(`${process.env.REACT_APP_BASE_URL}`);
    API.get(`${process.env.REACT_APP_BASE_URL}${GET_POSTS}`)
      .then((res) => {
        setPosts(res?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alertify.warning(err?.response?.data?.message);
        history.push("/");
        localStorage.clear();
      });

    socket.on("new-like", (e) => {
      onLikeHandler(e);
    });

    socket.on("new-post", (e) => {
      onAddNewPost(e);
    });

    socket.on("comments", (e) => {
      onAddNewComment(e);
    });

    socket.on("delete-post", (e) => {
      onDeletePost(e);
    });
  }, [history]);

  return (
    <>
      <div className="home">
        <div className="home__left-container">
          <Profile />
        </div>
        <div className="home__center-container">
          <div className="col m-auto p-2 home__cards home_disable-hover">
            <h4>{HOME}</h4>
          </div>
          <div className="col m-auto p-2 home__cards">
            <AddPost />
          </div>
          {isLoading &&
            DUMMY_ARRAY.map((key) => {
              return (
                <div className="col m-auto p-2 home__cards" key={key}>
                  <PostLoading />
                </div>
              );
            })}
          {posts.map((post) => {
            return (
              <div className="col m-auto p-2 home__cards" key={post._id}>
                <Post
                  name={post?.user?.name}
                  text={post?.text}
                  createdAt={post?.createdAt}
                  likes={post?.likes}
                  postId={post?._id}
                  postedBy={post?.user}
                  comments={post?.comments}
                  userImgUrl={post?.user?.imgUrl}
                />
              </div>
            );
          })}
        </div>
        <div className="home__right-container">
          <div className="ml-auto">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{LOGOUT}</Tooltip>}
            >
              <Button
                variant="light"
                onClick={onLogoutHandler}
                className="home__logout-btn"
              >
                <FiLogOut />
              </Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
