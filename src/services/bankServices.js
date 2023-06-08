import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const getAllBank = async (token) => {
    try {
        let res = await axios.get(`${API_URL}/allBank`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
            return {
                data: res.data,
                message: res.message,
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

export const getBankById = async (token, id) => {
    try {
        const res = await axios.get(`${API_URL}/bank/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
            return {
                data: res.data,
                message: res.message,
                errCode: 0,
            };
        }
    } catch (error) {
        return {
            data: null,
            message: error.response.data.message,
            errCode: 1,
        };
    }
};

export const addAccessedUser = async (token, bankId, userId) => {
    try {
        let res = await axios.post(
            `${API_URL}/addAccessedUser/${bankId}/${userId}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (res.status === 200) {
            const res = await getAllBank(token);
            if (res.errCode === 0) {
                return {
                    data: res.data,
                    message: res.message,
                    errCode: 0,
                };
            }
        }
    } catch (error) {
        return {
            data: null,
            message: error.response.data.message,
            errCode: 1,
        };
    }
};
