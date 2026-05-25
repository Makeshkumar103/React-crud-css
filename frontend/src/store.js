import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';


export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    auth: authReducer,

  },
});