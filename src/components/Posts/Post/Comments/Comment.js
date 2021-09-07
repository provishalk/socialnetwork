import React from "react";
import Comments from "./Comments";
import AddComment from "./AddComment/AddComment";
import "./Comment.scss";
const Comment = ({ comments, postId }) => {
  return (
    <div className="row">
      <AddComment postId={postId} />
      {comments.map((comment) => {
        return <Comments comment={comment} key={comment._id} />;
      })}
    </div>
  );
};

export default Comment;
