import React from "react";

const Bookmark = ({ _id, bookmark, onHandleBookmark }) => {
  return (
    <i
      type="button"
      className={`bi bi-bookmark-heart${
        bookmark === false ? "" : "-fill text-danger"
      }`}
      onClick={() => onHandleBookmark(_id)}
    />
  );
};

export default Bookmark;
