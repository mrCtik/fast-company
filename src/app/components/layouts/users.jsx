import React from "react";
import { useParams } from "react-router-dom";
import PageOfUser from "../pageOfUser";
import UsersList from "../usersList";

const Users = () => {
    const { userId } = useParams();

    return userId ? <PageOfUser id={userId} /> : <UsersList />;
};

export default Users;
