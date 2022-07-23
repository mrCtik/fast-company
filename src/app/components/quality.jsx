import React from "react";

const Quality = ({ _id, name, color }) => (
    <span key={_id} className={`badge m-1 bg-${color}`}>
        {name}
    </span>
);

export default Quality;
