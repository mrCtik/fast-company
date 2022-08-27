import PropTypes from "prop-types";
import React from "react";

const SerchByName = ({ onSearchBy, value }) => {
    const handleChange = ({ target }) => {
        onSearchBy(String(target.value));
    };

    return (
        <div className="input-group mt-2">
            <input
                className="form-control"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Поиск по имени..."
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
SerchByName.propTypes = {
    onSearchBy: PropTypes.func.isRequired,
    value: PropTypes.string
};
export default SerchByName;
