import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiestList from "./qulitiesList";
import Table from "./table";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onHandleBookmark,
    onHandleDelete,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiestList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    _id={user._id}
                    bookmark={user.bookmark}
                    onClick={() => onHandleBookmark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onHandleDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            bookmark: PropTypes.bool,
            completedMeetings: PropTypes.number,
            name: PropTypes.string,
            profession: PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string
            }),
            qualities: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string,
                    color: PropTypes.string
                })
            ),
            rate: PropTypes.number,
            _id: PropTypes.string
        })
    ).isRequired,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    onHandleBookmark: PropTypes.func,
    onHandleDelete: PropTypes.func
};

export default UserTable;
