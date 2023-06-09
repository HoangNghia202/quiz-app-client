import { TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import backgroundImage from "../../assets/img/background-login.png";
import { loginUser, registerUser } from "../../services/authServices";
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
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL", API_URL);

const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const initialValueRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

let initialValueLogin = {
    email: "",
    password: "",
};
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

    const handleLogin = async (values, { setSubmitting }) => {
        console.log("values", values);
        setSubmitting(true);

        if (typeForm === "login") {
            const form = {
                email: values.email,
                password: values.password,
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
        } else {
            const form = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            };
            console.log("form", form);
            const res = await registerUser(form);
            console.log("res from register user", res);

            if (res.errCode === 0) {
                toast.success(res.message);
                setTypeForm("login");
                initialValueLogin = {
                    email: res.data.email,
                    password: "",
                };
            }
        }
    };

    // const handleChangeForm = (event) => {
    //     setFormInput({
    //         ...formInput,
    //         [event.target.name]: event.target.value,
    //     });
    // };

    console.log("formInput>>>", formInput);

    return (
        <>
            <div className="h-100vh flex justify-center items-center">
                <div
                    className="grid md:grid-cols-3 bg-white rounded-md"
                    style={{ minHeight: "500px", width: "800px" }}
                >
                    <div className="col-span-1 px-2 bg-gray-1-- rounded-md rounded-tr-none rounded-e-none">
                        <Formik
                            initialValues={
                                typeForm === "login"
                                    ? initialValueLogin
                                    : initialValueRegister
                            }
                            validationSchema={
                                typeForm === "login"
                                    ? loginSchema
                                    : registerSchema
                            }
                            onSubmit={handleLogin}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                isSubmitting,
                                resetForm,
                                setFieldValue,
                            }) => (
                                <Form className="text-center">
                                    <Typography
                                        variant="h4"
                                        style={{
                                            fontWeight: "bold",
                                            color: "black",
                                            marginTop: "20px",
                                        }}
                                    >
                                        {typeForm === "login"
                                            ? "Login"
                                            : "Register"}
                                    </Typography>
                                    {typeForm !== "login" && (
                                        <>
                                            <Field
                                                as={TextField}
                                                size="small"
                                                name="firstName"
                                                label="First Name"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                error={
                                                    touched.firstName &&
                                                    Boolean(errors.firstName)
                                                }
                                                helperText={
                                                    touched.firstName &&
                                                    errors.firstName
                                                }
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.firstName}
                                                className="sm:col-span-2 md:col-span-1"
                                            />

                                            <Field
                                                as={TextField}
                                                size="small"
                                                name="lastName"
                                                label="Last Name"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                error={
                                                    touched.lastName &&
                                                    Boolean(errors.lastName)
                                                }
                                                helperText={
                                                    touched.lastName &&
                                                    errors.lastName
                                                }
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.lastName}
                                                className="sm:col-span-2 md:col-span-1"
                                            />
                                        </>
                                    )}
                                    <Field
                                        as={TextField}
                                        size="small"
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        error={
                                            touched.email &&
                                            Boolean(errors.email)
                                        }
                                        helperText={
                                            touched.email && errors.email
                                        }
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        className="col-span-2"
                                    />

                                    <Field
                                        as={TextField}
                                        size="small"
                                        name="password"
                                        label="Password"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        error={
                                            touched.password &&
                                            Boolean(errors.password)
                                        }
                                        helperText={
                                            touched.password && errors.password
                                        }
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        className="col-span-2"
                                        type="password"
                                    />

                                    {typeForm !== "login" && (
                                        <Field
                                            as={TextField}
                                            size="small"
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={
                                                touched.confirmPassword &&
                                                Boolean(errors.confirmPassword)
                                            }
                                            helperText={
                                                touched.confirmPassword &&
                                                errors.confirmPassword
                                            }
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.confirmPassword}
                                            className="col-span-2"
                                            type="password"
                                        />
                                    )}

                                    <div className="mt-4">
                                        {typeForm === "login" ? (
                                            <button
                                                className="bg-gray-800 up"
                                                disabled={isSubmitting}
                                                type="submit"
                                            >
                                                {isSubmitting
                                                    ? "LOADING"
                                                    : "LOGIN"}
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-gray-800 up"
                                                disabled={isSubmitting}
                                                type="submit"
                                            >
                                                {isSubmitting
                                                    ? "LOADING"
                                                    : "REGISTER"}
                                            </button>
                                        )}
                                    </div>

                                    <div className="text-clip">
                                        {typeForm === "login" ? (
                                            <Typography className="text-black">
                                                You don't have an account?{" "}
                                                <span
                                                    className="text-blue-600 underline decoration-solid cursor-pointer"
                                                    onClick={() => {
                                                        setTypeForm("register");
                                                        resetForm();
                                                    }}
                                                >
                                                    Register
                                                </span>
                                            </Typography>
                                        ) : (
                                            <Typography className="text-black">
                                                You have an account?{" "}
                                                <span
                                                    className="text-blue-600 underline decoration-solid cursor-pointer"
                                                    onClick={() => {
                                                        setTypeForm("login");
                                                        resetForm();
                                                    }}
                                                >
                                                    Login
                                                </span>
                                            </Typography>
                                        )}
                                    </div>
                                </Form>
                            )}
                        </Formik>
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
