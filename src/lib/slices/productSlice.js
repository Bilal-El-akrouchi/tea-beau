import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
    name: 'product',
    initialState:{
        produits: [],  // ✅ Passé en minuscule pour cohérence avec `useSelector`
        loading: true,
        error: null
    },    
    reducers:{
        setProduct: (state, action) => {
            state.produits = action.payload  // ✅ Correction de "Produits" -> "produits"
        },
        setLoading: (state, action) => {  // ✅ Correction de "setLoeading" -> "setLoading"
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
});

export const fetchProducts = () => (dispatch) => {
    axios
        .get('https://fakestoreapi.com/products')
        .then((response) => {
            dispatch(setProduct(response.data));
            dispatch(setLoading(false));  // ✅ Correction de "setLoeading" -> "setLoading"
        })
        .catch((error) => {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        });
};

export const { setError, setProduct, setLoading } = productSlice.actions;
export default productSlice.reducer;
