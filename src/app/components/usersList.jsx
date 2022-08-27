import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import GroupList from "./groupList";
import API from "../API";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UserTable from "./usersTable";
import SerchByName from "./serchByName";

const pageSize = 4;

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState([]);
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState([]);
    const [searchByText, setSearchByText] = useState("");

    useEffect(() => {
        Promise.all([
            API.users.fetchAll().then((data) => setUsers(data)),
            API.professions.fetchAll().then((data) => setProfessions(data))
        ]).catch();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        if (searchByText && selectedProf) {
            setSearchByText("");
        }
    }, [selectedProf]);

    const handleSearch = (searchText) => {
        setSearchByText(searchText);
    };

    if (!users.length) return "Loading...";

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

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers =
        (selectedProf &&
            users.filter((user) => _.isEqual(user.profession, selectedProf))) ||
        (searchByText &&
            users.filter(({ name }) =>
                name.toLowerCase().includes(searchByText.toLowerCase())
            )) ||
        users;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const currentPageBefore = Math.ceil(count / pageSize);
    if (currentPage > currentPageBefore) {
        setCurrentPage(currentPageBefore);
    }

    const clearFilter = () => {
        setSelectedProf(null);
    };

    return (
        <div className="d-flex">
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                    selectedItem={selectedProf}
                    items={professions}
                    onItemSelect={handleProfessionSelect}
                />
                <button className="btn btn-secondary m-2" onClick={clearFilter}>
                    Сбросить фильтр
                </button>
            </div>
            <div className="d-flex flex-column">
                <SearchStatus number={count} />
                <SerchByName onSearchBy={handleSearch} value={searchByText} />
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
};

export default UsersList;
