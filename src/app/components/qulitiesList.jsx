import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiestList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};

QualitiestList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiestList;
