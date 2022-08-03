import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../API";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const Users = ({ users: allUsers, onHandleBookmark, onHandleDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 4;

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

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => {
            // есть вариант с JSON.stringify(), но он не особо подходит
            // как я понял, если будет изменен порядок - он выдаст false
            return _.isEqual(user.profession, selectedProf);
            //   user.profession === selectedProf;
        })
        : allUsers;
    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const currentPageUpdate = (currentPage - 1) ? (currentPage - 1) : currentPage;
    useEffect(() => {
        setCurrentPage(currentPageUpdate);
    }, [Math.ceil(count / pageSize)]);

    // При такой реализации пропадает SearchStatus, если удалить всех юзеров
    // if (count === 0) {
    //     return null;
    // }

    // Преждняя реализация корректировки страницы при удалении юзеров
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
                        Сбросить фильтр
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus number={count} />
                {count !== 0 && (
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
