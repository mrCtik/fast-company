import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const getSortArrow = () => {
        return (
            <i
                className={`bi bi-caret-${
                    selectedSort.order === "asc" ? "up" : "down"
                }-fill`}
            ></i>
        );
    };
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {columns &&
                    Object.keys(columns).map((column) => (
                        <th
                            key={column}
                            onClick={
                                columns[column].path
                                    ? () => handleSort(columns[column].path)
                                    : null
                            }
                            scope="col"
                            role={columns[column].path ? "button" : ""}
                        >
                            {columns[column].name}
                            {columns[column].path &&
                                columns[column].path === selectedSort.path &&
                                getSortArrow()}
                        </th>
                    ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableHeader;
