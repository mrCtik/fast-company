import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
    return (
        <ul className="nav nav-pills">
            <NavLink exact className="nav-link nav-item m-2" to="/">
                Main
            </NavLink>
            <NavLink className="nav-link nav-item m-2" to="/login">
                Login
            </NavLink>
            <NavLink className="nav-link nav-item m-2" to="/users">
                Users
            </NavLink>
        </ul>
    );
};
export default NavBar;
