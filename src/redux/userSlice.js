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
            state.user = action.payload.user;
            state.accessToken = action.payload.token;
        },

        isLogin: (state, action) => {
            if (user.id) {
                state.isFetching = false;
                state.isLogin = true;
            }
        },

        logout: (state, action) => {
            state.user = null;
            state.isLogin = false;
            state.isFetching = false;
            state.accessToken = null;
        },
    },
});

export const { setUser, isLogin, logout } = userSlice.actions;
export default userSlice.reducer;
