import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistedAuthReducer, persistedUserReducer } from './reducers';

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);
export default store;
