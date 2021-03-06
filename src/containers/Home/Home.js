import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { BsFillBellFill } from "react-icons/bs";
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import io from "socket.io-client";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import alertify from "alertifyjs";
import AddPost from "../../components/Posts/AddPost/AddPost";
import Post from "../../components/Posts/Post/Post";
import API from "../../utils/API";
import {
  FRIEND_LIST,
  GET_MORE_POST,
  GET_POSTS,
  NO_MORE_POST,
} from "../../utils/constants";
import { LOGOUT } from "../../labels/button";
import { CONTACTS, HOME } from "../../labels/headings";
import Profile from "../../components/User/Profile/Profile";
import PostLoading from "../../components/Posts/PostLoading/PostLoading";
import Notification from "../../components/Notification/Notification";
import { getUserImgFromLocalStorage } from "../../utils/functions";
import UserImgContext from "../../contextStore/UserImgContext";
import "./Home.scss";

const Home = ({ history }) => {
  const DUMMY_ARRAY = [1, 2, 3, 4, 5, 6];
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userImg, setUserImg] = useState(getUserImgFromLocalStorage());
  const [notificationCount, setNotificationCount] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [morePost, setMorePost] = useState(true);
  const displayDropDown = notificationCount ? "block" : "none";

  const onNotificationCountHandler = (value) => {
    setNotificationCount(value === 0 ? null : value);
  };

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
    const sortedComments = _.orderBy(
      newComment.comments,
      ["createdAt"],
      ["desc"]
    );
    setPosts((oldPosts) => {
      let clonePosts = _.cloneDeep(oldPosts);
      _.forEach(clonePosts, (post) => {
        if (post._id === newComment._id) {
          post.comments = sortedComments;
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
    API.get(`${GET_POSTS}`)
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
    API.get(`${FRIEND_LIST}`)
      .then((res) => {
        const data = res?.data?.data;
        setFriendList(_.uniqBy(data, "_id"));
      })
      .catch((err) => console.log(err));

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

  const loadMorePosts = () => {
    setMorePost(false);
    setIsLoading(true);
    API.get(`${GET_MORE_POST}`)
      .then((res) => {
        setPosts([...posts, ...res?.data?.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setIsLoading(false);
      });
  };
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={morePost}
      endMessage={
        !isLoading && (
          <p className="mt-3" style={{ textAlign: "center" }}>
            <b>{NO_MORE_POST}</b>
          </p>
        )
      }
    >
      <UserImgContext.Provider value={{ userImg, setUserImg }}>
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
                    friendList={friendList}
                  />
                </div>
              );
            })}
            {isLoading &&
              DUMMY_ARRAY.map((key) => {
                return (
                  <div className="col m-auto p-2 home__cards" key={key}>
                    <PostLoading />
                  </div>
                );
              })}
          </div>
          <div className="home__right-panel">
            <div className="home__right-panel__container">
              <div className="home__right-panel__container__dropdown ">
                <button className="home__right-panel__container__dropdown__btn">
                  <BsFillBellFill />
                  <span>{notificationCount}</span>
                </button>
                <div
                  className="home__right-panel__container__dropdown__body"
                  style={{ display: `${displayDropDown}` }}
                >
                  <Notification
                    onNotificationCountHandler={onNotificationCountHandler}
                  />
                </div>
              </div>
              <div className="exit-btn">
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
              {friendList.length ? (
                <div className="home__right-panel__friend_list">
                  <div className="home__right-panel__friend_list__heading">
                    {CONTACTS}
                  </div>
                  <hr className="home__right-panel__friend_list__divider" />
                  <div className="home__right-panel__friend_list__names-container">
                    {friendList.map((friend) => (
                      <div
                        key={friend._id}
                        className="home__right-panel__friend_list__names"
                      >
                        {friend.name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </UserImgContext.Provider>
    </InfiniteScroll>
  );
};

export default Home;
