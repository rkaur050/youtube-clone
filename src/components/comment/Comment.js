import React from "react";
import moment from "moment";
import "./_comment.scss";

const Comment = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;

  return (
    <div className="comment pb-2 pt-2 d-flex">
      <img
        src={authorProfileImageUrl}
        className="rounded-circle mr-3"
        alt="profile"
      />
      <div className="comment__body">
        <p className="comment__header mb-0">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="comment__description mb-0">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
