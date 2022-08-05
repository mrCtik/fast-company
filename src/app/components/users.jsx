import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../API";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UserTable from "./usersTable";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;

    const [users, setUsers] = useState();

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleBookmark = (userId) => {
        const newState = users.map((user) => {
            if (user._id === userId) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsers(newState);
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
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

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => {
                  // есть вариант с JSON.stringify(), но он не особо подходит
                  // как я понял, если будет изменен порядок - он выдаст false
                  return _.isEqual(user.profession, selectedProf);
                  //   user.profession === selectedProf;
              })
            : users;
        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        // const currentPageUpdate =
        //     currentPage - 1 ? currentPage - 1 : currentPage;
        // useEffect(() => {
        //     setCurrentPage(currentPageUpdate);
        // }, [Math.ceil(count / pageSize)]);

        // Преждняя реализация корректировки страницы при удалении юзеров
        const currentPageBefore = Math.ceil(count / pageSize);
        if (currentPage > currentPageBefore) {
            setCurrentPage(currentPageBefore);
        }

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
                            Сбросить фильтр
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus number={count} />
                    {count !== 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onHandleDelete={handleDelete}
                            onHandleBookmark={handleBookmark}
                        />
                    )}
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
    }
    return "Loading...";
};

Users.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            bookmark: PropTypes.bool,
            rate: PropTypes.number,
            completedMeetings: PropTypes.number,
            qualities: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string,
                    color: PropTypes.string,
                    name: PropTypes.string
                })
            ),
            profession: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string
            }),
            onHandleDelete: PropTypes.func,
            onHandleToggleBookmark: PropTypes.func
        })
    )
};

export default Users;
