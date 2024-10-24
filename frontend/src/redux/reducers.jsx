import { createSlice } from '@reduxjs/toolkit';
import { login, logout, fetchUserProfile, updateUsername } from './actions';

// Constantes pour les statuts
const STATUS = {
  VOID: 'VOID',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

// Slice pour l'authentification

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: STATUS.VOID,
    isConnected: false,
    token: null,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.isConnected = true;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.isConnected = false;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = STATUS.VOID;
        state.isConnected = false;
        state.token = null;
        state.error = null;
      });
  },
});

// Slice pour l'utilisateur

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: STATUS.VOID,
    userData: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.userData.userName = action.payload.userName;
      });
  },
});

// Exporter les reducers
export const { resetError } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const userReducer = userSlice.reducer;
