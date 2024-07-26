import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import UserList from "../../components/UserList";
import axios from "axios";
import "../../assets/styles/AdminPage.css";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_API_URL;

const AdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [data, setData] = useState([]);

    const [isNavVisible, setIsNavVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "${URL}/api/user/getAllProfiles"
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const handleEnableDisableUsers = async () => {
        try {
            const promises = selectedUsers.map((email) =>
                axios.put(`${URL}/api/user/update`, {
                    ...data.find((user) => user.email === email),
                    validated: !data.find((user) => user.email === email).validated,
                })
            );
            await Promise.all(promises);

            setData((prevData) =>
                prevData.map((user) =>
                    selectedUsers.includes(user.email)
                        ? {...user, validated: !user.validated}
                        : user
                )
            );
            if(selectedUsers.includes(user.email))
                dispatch({type: "SET_USER", payload: {...user,validated:!user.validated}});
            console.log("Users enabled/disabled successfully");
            setSelectedUsers([]);
        } catch (error) {
            console.error("Error enabling/disabling users:", error);
        }
    };
    const handleDeleteUsers = async () => {
        try {
            const promises = selectedUsers.map((email) =>
                axios.delete(`${URL}/api/user/deleteByEmail/${email}`)
            );
            await Promise.all(promises);

            setData((prevData) =>
                prevData.filter((user) => !selectedUsers.includes(user.email))
            );

            console.log("Users deleted successfully");
            setSelectedUsers([]);
        } catch (error) {
            console.error("Error deleting users:", error);
        }
    };

    return (
        <div className="admin-page">
            <Header/>
            <div className="menu-toggle" onClick={() => setIsNavVisible(!isNavVisible)}>
                <div></div>
                <div></div>
                <div></div>
            </div>


			<div className={`content ${isNavVisible ? "nav-visible" : ""}`}>
                <div className={`sidebar ${isNavVisible ? "visible" : ""}`}>
                    <button className="close-btn" onClick={() => setIsNavVisible(false)}>×</button>
                    <NavBar />
                </div>
                <div className="admin-content">
                    <UserList
                        selectedUsers={selectedUsers}
                        setSelectedUsers={setSelectedUsers}
                        setData={setData}
                        data={data}
                    />
                    <div className="admin-buttons">
                        <button
                            className="add-user-button"
                            onClick={()=>navigate("/admin/add")}
                        >
                            Add Users
                        </button>
                        <button
                            className="delete-user-button"
                            disabled={selectedUsers.length === 0}
                            onClick={handleDeleteUsers}
                        >
                            Delete Users
                        </button>
                        <button
                            className="toggle-user-button"
                            disabled={selectedUsers.length === 0}
                            onClick={handleEnableDisableUsers}
                        >
                            Enable/Disable Users
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
