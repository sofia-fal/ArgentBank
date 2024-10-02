// features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'VOID',
    userData: {},
    error: null,
  },
  reducers: {
    updateUsername: (state, action) => {
      state.userData.username = action.payload;  // Mise à jour du nom d'utilisateur
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.payload;
      });
  },
});

export const { updateUsername } = userSlice.actions;

export default userSlice.reducer;
