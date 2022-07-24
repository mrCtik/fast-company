import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ _id, bookmark, onHandleBookmark }) => (
    <i
        type="button"
        className={`bi bi-bookmark-heart${bookmark ? "-fill text-danger" : ""}`}
        onClick={() => onHandleBookmark(_id)}
    />
);

Bookmark.propTypes = {
    _id: PropTypes.string.isRequired,
    onHandleBookmark: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired
};

export default Bookmark;
