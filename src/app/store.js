import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";

export default configureStore({
    reducer: { 
        auth: authReducer,
        alert: alertReducer, 
    }
})