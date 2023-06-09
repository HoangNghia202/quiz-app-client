import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomePage from "./homeScreen";
import LoginPage from "./loginScreen";
const redirectPage = () => {
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.user.userReducer.isLogin);
    const checkIfLoggedIn = () => {
        if (isLogin) {
            return navigate("/home");
        } else {
            return navigate("/login");
        }
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);
    return <div></div>;
};
export default redirectPage;
