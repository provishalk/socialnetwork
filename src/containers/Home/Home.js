import React, { useState, useEffect } from 'react'
import MyNavBar from "../../components/NavBar/MyNavBar"
import AddPost from '../../components/Posts/AddPost/AddPost'
import Post from '../../components/Posts/Post/Post'
import "./Home.scss"
import axios from 'axios'
import { GET_POSTS } from '../../utils/constants'
import io from "socket.io-client";
import _ from "lodash"
const Home = () => {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const onAddNewPost = (newPost) => {
        setPosts(oldPosts => [newPost, ...oldPosts])
    }


    const onLikeHandler = (like) => {
        setPosts(oldPosts => {
            let clonePosts = _.cloneDeep(oldPosts);
            _.forEach(clonePosts, post => {
                if (post._id === like._id) {
                    post.likes = like.likes
                }
            })
            return clonePosts
        })
    }

    useEffect(() => {
        const socket = io.connect(`${process.env.REACT_APP_BASE_URL}`)
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios
            .get(`${process.env.REACT_APP_BASE_URL}${GET_POSTS}`, config)
            .then(res => setPosts(res.data.data))
            .catch(err => console.error(err));

        socket.on("new-like", (event) => {
            onLikeHandler(event)
        })

        socket.on("new-post", (e) => {
            onAddNewPost(e);
        })
    }, [])

    return (
        <>
            <MyNavBar />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto  p-2 font-weight-bold home__cards">
                        <h4>Home</h4>
                    </div>
                    <div className="col-md-8 m-auto  p-2 font-weight-bold home__cards">
                        <AddPost />
                    </div>
                    {posts.map((post) => {
                        return <div className="col-md-8 m-auto  p-2 font-weight-bold home__cards" key={post._id}>
                            <Post
                                name={post?.user?.name}
                                text={post.text}
                                createdAt={post.createdAt}
                                likes={post?.likes}
                                _id={post?._id}
                                postedBy={post?.user}
                            />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Home
