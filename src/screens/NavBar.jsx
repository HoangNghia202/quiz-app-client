import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
const NavBar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("logout");
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="w-full bg-slate-700 flex justify-between items-center px-10 py-2 absolute top-0">
            <div className="app-logo">
                <h3>Quiz App</h3>
            </div>

            <div className="flex items-center">
                <div className="px-2">{props.userName}</div>
                <div>
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
