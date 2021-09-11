import React, { useState, useEffect, useContext } from "react";
import "./AddPost.scss";
import { ENTER_POST, CREATE_POST, SESSION_EXPIRED } from "../../../utils/constants";
import alertify from "alertifyjs";
import { useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import API from "../../../utils/API"
import UserImgContext from "../../../contextStore/UserImgContext";

const AddPost = () => {
  let history = useHistory();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { userImg } = useContext(UserImgContext);

  const onPostClickHandler = () => {
    setIsLoading(true);
    setDisabled(true);
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
        setIsLoading(false);
        if (err?.response?.data?.message === SESSION_EXPIRED) {
          history.push("/");
          localStorage.clear();
        }
      });
  };
  useEffect(() => {
    setDisabled(text.length !== 0 ? false : true);
  }, [text]);
  return (
    <>
      <div className="addpost">
        <div className="addpost__leftPart">
          <img
            src={userImg}
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
            disabled={disabled}
          >
            {isLoading ? (<Spinner animation="border" variant="light" size="sm" />) : (<>Post</>)}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPost;
