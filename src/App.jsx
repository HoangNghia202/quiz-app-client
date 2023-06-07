import { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/homeScreen";
import LoginPage from "./screens/loginScreen";
import RedirectPage from "./screens/RedirectPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    console.log("currentUser", currentUser);

    return (
        <>
            <Routes>
                <Route path="/" element={<RedirectPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
