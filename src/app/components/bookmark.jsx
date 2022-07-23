import React from "react";

const Bookmark = ({ _id, bookmark, onHandleBookmark }) => (
    <i
        type="button"
        className={`bi bi-bookmark-heart${bookmark ? "-fill text-danger" : ""}`}
        onClick={() => onHandleBookmark(_id)}
    />
);
export default Bookmark;
