import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer, userReducer } from './reducers';

// Configuration de persist pour l'authReducer
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Détermine les reducers qui seront persistés (auth)
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Utilisation du reducer persistant
    user: userReducer,
  },
});

export const persistor = persistStore(store);
export default store;
