import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Actions pour l'authentification

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);
    const token = response.data.body.token;
    if (token) return token;
    throw new Error('Token not found in response');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'An unexpected error occurred' });
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {});

// Actions pour l'utilisateur

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to fetch user profile' });
  }
});

export const updateUsername = createAsyncThunk('user/updateUsername', async (newUsername, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const response = await axios.put(
      'http://localhost:3001/api/v1/user/profile',
      { userName: newUsername },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    return response.data.body;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to update username' });
  }
});
