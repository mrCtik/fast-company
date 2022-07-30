import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../API";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, onHandleBookmark, onHandleDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 4;

    useEffect(() => {
        API.professions
            .fetchAll()
            .then((data) => setProfessions(Object.assign(data)));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProffesionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers;
    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    if (count === 0) {
        return null;
    }

    // const currentPageBefore = Math.ceil(count / pageSize);
    // if (currentPage > currentPageBefore) {
    //     setCurrentPage(currentPageBefore);
    // }

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProffesionSelect}
                    />
                    <button
                        className="btn btn-secondary m-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus number={count} />
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChandge={handlePageChange}
                    />
                </div>
            </div>
        </div>
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
