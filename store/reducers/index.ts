import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import authSlice from "../features/auth";
import cartSlice from "../features/cart";
export const rootReducers = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    cart: cartSlice,
});
