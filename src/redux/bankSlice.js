import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    banks: [],
    isFetching: false,
    bankSelected: {},
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

        setBankSelected: (state, action) => {
            state.bankSelected = action.payload;
        },
    },
});

export const { setBanks, fetchBanks, fetchBanksSuccess, setBankSelected } =
    bankSlice.actions;
export default bankSlice.reducer;
