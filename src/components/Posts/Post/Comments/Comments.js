import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment/AddComment";
import "./Comments.scss";
const Comments= ({ comments, postId }) => {
  return (
    <div className="row">
      <AddComment postId={postId} />
      {comments.map((comment) => {
        return <Comment comment={comment} key={comment?._id} />;
      })}
    </div>
  );
};

export default Comments;