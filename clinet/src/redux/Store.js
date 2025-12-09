import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice.js'
import newsReducer from './slice/newsSlice.js'

const store = configureStore({
    reducer : {
        auth : authReducer,
        news: newsReducer
    }
})

export default store;