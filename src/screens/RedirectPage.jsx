import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomePage from "./homeScreen";
import LoginPage from "./loginScreen";
const redirectPage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.userInfo);
    const checkIfLoggedIn = () => {
        if (currentUser.id) {
            return navigate("/home");
        } else {
            return navigate("/login");
        }
    };

    useEffect(() => {
        checkIfLoggedIn(currentUser);
    }, [currentUser]);
    return <div></div>;
};
export default redirectPage;
