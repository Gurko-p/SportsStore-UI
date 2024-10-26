import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";
import loaderReducer  from "../features/loader/loaderSlice";
import cartReducer from "../features/shopingCart/cartSlice";
import themeReducer from '../features/theme/themeSlice';

export default configureStore({
    reducer: { 
        auth: authReducer,
        alert: alertReducer, 
        loader: loaderReducer,
        cart: cartReducer,
        theme: themeReducer,
    }
})