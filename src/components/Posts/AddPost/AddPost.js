import React, { useState, useEffect } from "react";
import "./AddPost.scss";
import { ENTER_POST, CREATE_POST, SESSION_EXPIRED, DEFAULT_USER_PROFILE } from "../../../utils/constants";
import alertify from "alertifyjs";
import { useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import API from "../../../utils/API"
const AddPost = () => {
  let history = useHistory();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onPostClickHandler = (event) => {
    event.target.disabled = true;
    setIsLoading(true);
    const bodyParameters = { text };
    API
      .post(
        `${process.env.REACT_APP_BASE_URL}${CREATE_POST}`,
        bodyParameters
      )
      .then(() => {
        setText("");
        setIsLoading(false);
      })
      .catch((err) => {
        alertify.warning(err?.response?.data?.message);
        event.target.disabled = false;
        setIsLoading(false);
        if (err?.response?.data?.message === SESSION_EXPIRED) {
          history.push("/");
          localStorage.clear();
        }
      });
  };
  useEffect(() => {
    document.querySelector("#post-btn").disabled =
      text.length !== 0 ? false : true;
  }, [text]);
  return (
    <>
      <div className="addpost">
        <div className="addpost__leftPart">
          <img
            src={DEFAULT_USER_PROFILE}
            alt="profile"
            className="addpost-container__img"
          />
        </div>
        <div className="addpost__rightPart">
          <textarea
            id="post"
            className="addpost-container__textarea"
            name="post"
            rows="3"
            placeholder={ENTER_POST}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button
            className="btn btn-dark addpost-container__btn"
            id="post-btn"
            onClick={onPostClickHandler}
          >
            {isLoading ? (<Spinner animation="border" variant="light" size="sm" />) : (<>Post</>)}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPost;
