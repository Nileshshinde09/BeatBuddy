import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../slices/authSlice'
import cardSlice from "../slices/cardSlice";
import infoSlice from "../slices/infoSlice";
const store=configureStore(
    {
        reducer:{
            auth : authSlice,
            cards:cardSlice,
            info:infoSlice,
        }
    }
)
export default store;