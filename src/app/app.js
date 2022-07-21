import React, { useState } from "react";
import API from "./API";
import Header from "./components/searchStatus";
import Users from "./components/users";

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
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
      <Header number={users.length} />
      <Users
        onHandleDelete={handleDelete}
        onHandleBookmark={handleBookmark}
        users={users}
      />
    </>
  );
};

export default App;
