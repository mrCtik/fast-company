import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
    const { userId, edit } = useParams();
    if (!userId) {
        return <UsersListPage />;
    } else if (edit === "edit") {
        return <EditUserPage id={userId} />;
    } else {
        return <UserPage userId={userId} />;
    }
};

export default Users;
