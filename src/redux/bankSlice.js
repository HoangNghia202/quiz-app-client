import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const initialState = {
    banks: [],
    isFetching: false,
    bankSelected: {},
    questionNow: 0,
    answerOfUser: [],
};

const bankSlice = createSlice({
    name: "bank",
    initialState,
    reducers: {
        setBanks: (state, action) => {
            state.banks = action.payload;
        },
        fetchBanks: (state, action) => {
            state.isFetching = true;
        },

        fetchBanksSuccess: (state, action) => {
            state.isFetching = false;
        },

        fetchBanksFail: (state, action) => {
            state.banks = [];
            state.bankSelected = {};
            state.isFetching = false;
            state.questionNow = 0;
        },

        setBankSelected: (state, action) => {
            state.bankSelected = action.payload;
        },

        setNextQuestion: (state, action) => {
            state.questionNow = state.questionNow + 1;
        },

        resetQuestionNow: (state, action) => {
            state.questionNow = 0;
        },
        pushAnswerOfUser: (state, action) => {
            state.answerOfUser.push(action.payload);
        },

        resetAnswerOfUser: (state, action) => {
            state.answerOfUser = [];
        },
    },
});

export const fetchBanksData = async (token, dispatch) => {
    try {
        let res = await axios.get(`${API_URL}/allBank`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("res get banks>>>", res);

        if (res.status === 200) {
            dispatch(setBanks(res.data.data));
            dispatch(fetchBanksSuccess());
        }
    } catch (error) {
        console.log("error", error);
        dispatch(fetchBanksFail());
    }
};

export const setSelectedBank = (index, dispatch) => {
    let bankSelected = banks[index];
    dispatch(setBankSelected(bankSelected));
};

export const {
    setBanks,
    fetchBanks,
    fetchBanksSuccess,
    setBankSelected,
    fetchBanksFail,
    setNextQuestion,
    resetQuestionNow,
    pushAnswerOfUser,
    resetAnswerOfUser,
} = bankSlice.actions;
export default bankSlice.reducer;
