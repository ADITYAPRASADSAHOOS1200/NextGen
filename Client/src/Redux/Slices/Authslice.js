import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosinstance.js';

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  role: localStorage.getItem('role') || '',
  data: localStorage.getItem('data') || {},
};

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
  try {
    console.log('Redux data:-----', data);
    const res = axiosInstance.post('user/register', data);
    toast.promise(res, {
      loading: 'Wait, creating your account...',
      success: (response) => {
        return response?.data?.message;
      },
      error: 'Failed to create account',
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return rejectWithValue(error?.response?.data?.message);
  }
});

export const Login = createAsyncThunk('/auth/login', async (data) => {
  try {
    const res = axiosInstance.post('user/logIn', data);
    console.log(res)
    toast.promise(res, {
      loading: 'Verifying user authentication...',
      success: (response) => {
        return response?.data?.message;
      },
      error: 'Failed to authenticate',
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    
  }
});

export const Logout = createAsyncThunk('auth/logout', async (data) => {
  try {
    const res = axiosInstance.post('user/logOut', data);

    toast.promise(res, {
      loading: 'Wait! Logging out...',
      success: (response) => {
        return response?.data?.message;
      },
      error: 'Failed to log out',
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
   
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.fulfilled, (state, action) => {
        console.log('Action fulfilled ---- ', action);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('role', action?.payload?.data?.role);

        state.isLoggedIn = true;
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
      })
      .addCase(Logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = '';
      })
    }
});

export default authSlice.reducer;
