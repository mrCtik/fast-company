import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ _id, bookmark, ...rest }) => (
    <i
        {...rest}
        type="button"
        className={`bi bi-bookmark-heart${bookmark ? "-fill text-danger" : ""}`}
        // onClick={() => onHandleBookmark(_id)}
    />
);

Bookmark.propTypes = {
    _id: PropTypes.string.isRequired,
    // onHandleBookmark: PropTypes.func,
    bookmark: PropTypes.bool
};

export default Bookmark;
