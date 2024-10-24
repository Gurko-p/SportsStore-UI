import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";
import loaderReducer  from "../features/loader/loaderSlice"

export default configureStore({
    reducer: { 
        auth: authReducer,
        alert: alertReducer, 
        loader: loaderReducer
    }
})