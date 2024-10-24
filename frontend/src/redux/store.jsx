import { configureStore } from '@reduxjs/toolkit';
import { authReducer, userReducer } from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
