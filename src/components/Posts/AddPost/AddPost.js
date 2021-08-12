import React, { useState, useEffect } from 'react';
import "./AddPost.scss";
import { ENTER_POST } from '../../../utils/constants';
import axios from 'axios';
import alertify from 'alertifyjs';
import { CREATE_POST } from '../../../utils/constants';
const AddPost = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [text, setText] = useState("");
    const onPostClickHandler = () => {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const bodyParameters = { text };

        axios.post(
            `${process.env.REACT_APP_BASE_URL}${CREATE_POST}`,
            bodyParameters,
            config
        )
            .then(res => {
                alertify.success(res.data.message);
                setText("");
            })
            .catch(err => {
                alertify.warning(err.response.data.message);
            });
    }
    useEffect(() => {
        document.querySelector("#post-btn").disabled = text.length !== 0 ? false : true;
    }, [text])
    return (
        <>
            <div className="addpost-container">
                <div className="row">
                    <div className="col-1">
                        <img src="https://i.pravatar.cc/300" alt="profile" className="addpost-container__img" />
                    </div>
                    <div className="col-11">
                        <textarea
                            id="post"
                            className="addpost-container__textarea"
                            name="post"
                            rows="3"
                            placeholder={ENTER_POST}
                            value={text}
                            onChange={event => {
                                setText(event.target.value);
                            }}
                        />
                        <button
                            className="btn btn-dark addpost-container__btn"
                            id="post-btn"
                            onClick={onPostClickHandler}
                        >
                            Post
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddPost
