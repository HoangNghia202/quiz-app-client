import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
const NavBar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("logout");
        dispatch(logout());
        toast.success("Logout successfully");
        navigate("/login");
    };

    return (
        <div className="relative">
            <div className="w-full bg-slate-700 flex justify-between items-center px-10 py-2 fixed top-0 z-10">
                <div className="app-logo">
                    <h3>Quiz App</h3>
                </div>

                <div className="flex items-center">
                    <div className="px-2">{props.userName}</div>
                    <div>
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
