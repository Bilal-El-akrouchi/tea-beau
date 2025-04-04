import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const darktSlice = createSlice({
    name: 'darkMode',
    initialState:{
     darkMode: false
    },    
    reducers:{
        toggle: (state) => {
            state.darkMode = !state.darkMode
        }
    }
});

export const { toggle} = darktSlice.actions;
export default darktSlice.reducer