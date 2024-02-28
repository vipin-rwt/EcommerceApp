import {configureStore} from "@reduxjs/toolkit"
import cartSlice from './CartSlice.jsx'
export const Store=configureStore({
    reducer:{
        cart: cartSlice,
    },
    devTools:true
})