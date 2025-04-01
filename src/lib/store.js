import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; 
import productReducer from './slices/productSlice';

export const store = configureStore({
    reducer:{
        product: productReducer,  // Assure-toi que la clé est bien 'product'
        counter: counterReducer,
    }
})