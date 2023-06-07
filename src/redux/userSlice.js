import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    isFetching: false,
    isLogin: false,
    accessToken: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("action.payload", action.payload);

            state.userInfo = action.payload.user;
            state.accessToken = action.payload.token;
        },

        startLogin: (state, action) => {
            state.isFetching = true;
        },

        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.isLogin = true;
        },

        loginFail: (state, action) => {
            state.isFetching = false;
            state.isLogin = false;
        },

        logout: (state, action) => {
            state.userInfo = null;
            state.isLogin = false;
            state.isFetching = false;
            state.accessToken = null;
        },
    },
});

export const { setUser, startLogin, loginSuccess, loginFail, logout } =
    userSlice.actions;
export default userSlice.reducer;
