import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuthProfile = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/profile');
    return data;
  });

const initialState = {
    data: null,
    isLoggedIn: false
};

export const authSlice = createSlice({
    name: 'authApi',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            state.data = action.payload;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        logout: (state) => {
            state.data = null;
            state.isLoggedIn = false
        },
        getProfile: (state, action) => {
            state.data = action.payload;
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    
});

export const { setAuthState } = authSlice.actions;
export const { getProfile } = authSlice.actions;
export const { logout } = authSlice.actions;

export default authSlice.reducer