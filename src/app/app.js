import React, { useState, useEffect } from "react";
import API from "./API";
import Users from "./components/users";

const App = () => {
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
    return (
        <>
            {users && (
                <Users
                    onHandleDelete={handleDelete}
                    onHandleBookmark={handleBookmark}
                    users={users}
                />
            )}
        </>
    );
};

export default App;
