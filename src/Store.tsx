import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from './features/ApiSlice';
import AuthReducer from './features/Auth'

const Store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    'Auth':AuthReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default Store;