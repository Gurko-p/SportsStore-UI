import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice";
import snackBarReducer from "../features/snack/snackSlice";

export default configureStore({
    reducer: { 
        auth: authReducer,
        snackBar: snackBarReducer, 
    }
})