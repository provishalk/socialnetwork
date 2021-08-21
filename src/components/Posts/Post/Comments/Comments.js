import React from "react";
import OldComments from "./OldComments";
import "./Comments.scss";
import AddComment from "./AddComment";
const Comments = ({ comments, postId }) => {
  return (
    <div className="row">
      <AddComment postId={postId} />
      {comments.map((comment) => {
        return <OldComments comment={comment} key={comment._id} />;
      })}
    </div>
  );
};

export default Comments;
