import React from "react";
import declOfNum from "./utils/utils";
import PropTypes from "prop-types";

const SearchStatus = ({ number }) => {
    const classes = `badge m-1 bg-${number === 0 ? "danger" : "primary"}`;

    const text =
        number === 0
            ? "Никто с тобой не тусанет"
            : `${number} ${declOfNum(number, [
                "человек тусанет",
                "человека тусанут",
                "человек тусанет"
            ])} с тобой сегодня`;
    return (
        <h2>
            <span className={classes}>{text}</span>
        </h2>
    );
};

SearchStatus.propTypes = {
    number: PropTypes.number.isRequired
};

export default SearchStatus;
