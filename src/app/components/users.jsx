import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, onHandleBookmark, onHandleDelete }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (count === 0) {
        return null;
    }

    const userCrop = paginate(users, currentPage, pageSize);

    const currentPageBefore = Math.ceil(count / pageSize);
    if (currentPage > currentPageBefore) {
        setCurrentPage(currentPageBefore);
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    {userCrop.map((user) => (
                        <User
                            key={user._id}
                            {...user}
                            onHandleDelete={onHandleDelete}
                            onHandleBookmark={onHandleBookmark}
                        />
                    ))}
                </tbody>
            </table>

            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChandge={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
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
    onHandleBookmark: PropTypes.func.isRequired,
    onHandleDelete: PropTypes.func.isRequired
};

export default Users;
