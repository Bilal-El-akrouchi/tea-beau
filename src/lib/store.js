import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; 
import productReducer from './slices/productSlice';
import cartReducer from "./slices/cartSlice"; 
import darktSlice from "./slices/darkMode"

export const store = configureStore({
    reducer:{
        product: productReducer,  
        counter: counterReducer,
        cart: cartReducer, 
        toggle: darktSlice

    }
})