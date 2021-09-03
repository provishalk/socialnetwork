import React from "react";
import Skeleton from "react-loading-skeleton";
import "./PostLoading.scss";
const PostLoading = () => {
  return (
    <>
      <div className="post-loading">
        <div className="post-loading__left-container">
          <Skeleton circle={true} height={44} width={44} />
        </div>
        <div className="post-loading__right-container">
          <Skeleton height={18}/>
          <Skeleton height={70}/>
        </div>
      </div>
    </>
  );
};

export default PostLoading;
