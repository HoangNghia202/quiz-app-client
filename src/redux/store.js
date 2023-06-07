import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import bankReducer from "./bankSlice";
import thunk from "redux-thunk";
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedReducer,
        bank: bankReducer,
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
