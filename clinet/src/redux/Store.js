import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js";
import newsReducer from "./slice/newsSlice.js";
import countReducer from "./slice/newsSlice.js";
import laodingReducer from "./slice/newsSlice.js";
import productReducer from "./slice/newsSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    count: countReducer,
    laoding: laodingReducer,
    product: productReducer,
  },
});

export default store;
