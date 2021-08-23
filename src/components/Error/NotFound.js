import React from "react";
import img404 from "../../img/404errorimg.png";
import "./NotFound.scss"
const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound__left-panel">
        <img src={img404} alt="404 error" />
      </div>
      <div className="notfound__right-panel">
          <div>
              <h2>Awww...Don't Cry.</h2>
              <p>It's just a 404 Error.</p>
              <p>what you are looking for may me misplaced in Long Term Memory</p>
          </div>
      </div>
    </div>
  );
};

export default NotFound;
