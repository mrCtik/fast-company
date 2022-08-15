import React, { useEffect, useState } from "react";
import API from "../API";
import QualitiestList from "./qulitiesList";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const PageOfUser = ({ id }) => {
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        API.users.getById(id).then((data) => {
            setUser(data);
        });
    }, []);

    if (!user || !Object.keys(user).length) return <h2>Loading...</h2>;

    return (
        <>
            <h1>{user.name}</h1>
            <h3>Профессия: {user.profession.name}</h3>
            <QualitiestList qualities={user.qualities} />
            <h6>Встретился раз: {user.completedMeetings}</h6>
            <h3>Оценка: {user.rate}</h3>

            <button onClick={() => history.push("/users")}>
                Все Пользователи
            </button>
        </>
    );
};
PageOfUser.propTypes = {
    id: PropTypes.string.isRequired
};
export default PageOfUser;
