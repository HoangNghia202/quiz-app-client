import { TextField } from "@mui/material";
import React, { useState } from "react";
import backgroundImage from "../../assets/img/background-login.png";
import { loginUser } from "../../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setUser,
    startLogin,
    loginSuccess,
    loginFail,
} from "../../redux/userSlice";
import { toast } from "react-toastify";
import { fetchBanksData } from "../../redux/bankSlice";
const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL", API_URL);

const LoginPage = () => {
    const token = useSelector((state) => state.user.accessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [typeForm, setTypeForm] = useState("login");
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    console.log("typeForm", typeForm);

    const handleLogin = async () => {
        if (typeForm === "login") {
            const form = {
                email: formInput.email,
                password: formInput.password,
            };
            console.log("form", form);

            dispatch(startLogin());
            const res = await loginUser(form);
            console.log("res", res);

            if (res.errCode === 0) {
                dispatch(setUser(res.data));
                dispatch(loginSuccess());
                toast.success(res.message);
                navigate("/home");
            } else {
                dispatch(loginFail());
                toast.error(res.message);
            }
        }
    };

    const handleChangeForm = (event) => {
        setFormInput({
            ...formInput,
            [event.target.name]: event.target.value,
        });
    };

    console.log("formInput>>>", formInput);

    return (
        <>
            <div className="h-100vh flex justify-center items-center">
                <div
                    className="grid md:grid-cols-3 bg-white rounded-md"
                    style={{ height: "500px", width: "800px" }}
                >
                    <div className="col-span-1 px-2 bg-gray-1-- rounded-md rounded-tr-none rounded-e-none">
                        <div className="title-form my-4">
                            <h1 className="text-3xl font-bold text-center text-black">
                                {typeForm === "login" ? "Login" : "Register"}
                            </h1>
                        </div>
                        <div className="loginForm px-2 flex flex-col justify-center h-50% ">
                            {typeForm === "register" && (
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    variant="outlined"
                                    label="First name"
                                    size="small"
                                    name="firstName"
                                    value={formInput.firstName}
                                    onChange={(event) =>
                                        handleChangeForm(event)
                                    }
                                />
                            )}

                            {typeForm === "register" && (
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    variant="outlined"
                                    label="Last Name"
                                    size="small"
                                    name="lastName"
                                    value={formInput.lastName}
                                    onChange={(event) =>
                                        handleChangeForm(event)
                                    }
                                />
                            )}

                            <TextField
                                style={{ marginTop: "20px" }}
                                variant="outlined"
                                label="Email"
                                size="small"
                                name="email"
                                value={formInput.email}
                                onChange={(event) => handleChangeForm(event)}
                            />

                            <TextField
                                style={{ marginTop: "20px" }}
                                variant="outlined"
                                label="Password"
                                size="small"
                                type="password"
                                name="password"
                                value={formInput.password}
                                onChange={(event) => handleChangeForm(event)}
                            />
                        </div>
                        <div className="action-btn text-center mt-3">
                            {typeForm === "login" ? (
                                <div>
                                    <button onClick={() => handleLogin()}>
                                        Login
                                    </button>
                                    <div className="mt-2">
                                        <p className="text-blue-600">
                                            you don't have account?{" "}
                                            <p
                                                className="text underline cursor-pointer"
                                                onClick={() =>
                                                    setTypeForm("register")
                                                }
                                            >
                                                register
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <button>Register</button>
                                    <div className="mt-2">
                                        <p className="text-blue-600">
                                            you have account?{" "}
                                            <p
                                                className="text underline cursor-pointer"
                                                onClick={() =>
                                                    setTypeForm("login")
                                                }
                                            >
                                                Login
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className="col-span-2 rounded-md rounded-tl-none rounded-es-none"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
