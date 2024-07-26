import React from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import {FaHome, FaSignOutAlt, FaUser, FaUserShield} from "react-icons/fa";
import GroupTab from "./Group/GroupTab";
import FriendsTab from "./Friend/FriendsTab";
import "../assets/styles/NavBar.css";

const URL = process.env.REACT_APP_API_URL;

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const handleLogOut = async () => {
        try {
            const response = await axios.post(
                `${URL}/api/logIn/userLogOut?email=${user.email}`
            );
            if (response.status === 200) {
                dispatch({type: "SET_USER", payload: null});
                navigate("/");
            }
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    return (
        <nav className="navbar">
            <NavLink to="/main">
                <FaHome/>
                <span className="text-hide">Home</span>
            </NavLink>
            <NavLink to={`/profile/${user.email}`}>
                <FaUser/>
                <span className="text-hide">My Account</span>
            </NavLink>
            <GroupTab/>
            <FriendsTab/>
            {user.userLevel === "admin" && (
                <NavLink to="/admin">
                    <FaUserShield/> <span className="text-hide">Admin</span>
                </NavLink>
            )}
            <NavLink to="/" onClick={handleLogOut}>
                <FaSignOutAlt/> <span className="text-hide">Logout</span>
            </NavLink>
        </nav>
    );
};
export default NavBar;
