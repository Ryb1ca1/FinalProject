// store/store.js
import { configureStore } from "@reduxjs/toolkit"

// import { userReducer } from "./reducers/UserSlice";
import { apiSlice } from "../services/apiSlice.js";

/**
 * Инициализация Redux store
 * @returns {ReturnType<typeof configureStore>} Redux store
 */
export const setupStore = () => {
    return configureStore({
        reducer: {
            // user: userReducer,
            [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware)
    });
}
