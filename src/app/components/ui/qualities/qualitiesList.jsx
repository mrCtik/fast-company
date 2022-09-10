import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            color: PropTypes.string,
            name: PropTypes.string
        })
    ).isRequired
};

export default QualitiesList;
