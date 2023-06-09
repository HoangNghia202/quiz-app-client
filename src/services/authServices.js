import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const loginUser = async (form) => {
    let res;
    try {
        res = await axios.post(`${API_URL}/login`, form);
        if (res.status === 200) {
            return {
                data: res.data,
                message: res.data.message,
                errCode: 0,
            };
        }
    } catch (error) {
        console.log("error", error);
        return {
            data: null,
            message: error.response.data.message,
            errCode: 1,
        };
    }
};

export const registerUser = async (form) => {
    let res;
    console.log("form in register", form);

    try {
        res = await axios.post(`${API_URL}/register`, form);
        if (res.status === 201) {
            console.log("res from register api", res);
            return {
                data: res.data.user,
                message: "Register successfully",
                errCode: 0,
            };
        }
    } catch (error) {
        console.log("error", error);
        return {
            data: null,
            message: error.response.data.message,
            errCode: 1,
        };
    }
};
