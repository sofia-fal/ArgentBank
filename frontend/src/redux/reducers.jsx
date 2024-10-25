import { createSlice } from '@reduxjs/toolkit';
import { login, logout, fetchUserProfile, updateUsername } from './actions';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const STATUS = {
  VOID: 'VOID',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

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

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

const userPersistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

export const { resetError } = authSlice.actions;

export const authReducer = persistedAuthReducer;
export const userReducer = persistedUserReducer;
