import { configureStore } from '@reduxjs/toolkit';
import { postApi } from '../services/postApi';
import { tagsApi } from '../services/tagsApi';
import { authApi } from '../services/authApi';
import authReducer from './slices/authSlice'

export default configureStore({
    reducer: {
       [postApi.reducerPath] : postApi.reducer,
       [tagsApi.reducerPath] : tagsApi.reducer,
       [authApi.reducerPath] : authApi.reducer,
       authSlice: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            tagsApi.middleware,
            authApi.middleware
            ),
})