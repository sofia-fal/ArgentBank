// src/features/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// État initial
const initialState = {
  status: 'VOID',
  isConnected: false,
  token: null,
  error: null,
};

// Thunk pour gérer la connexion
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        credentials
      );
      return response.data.token; // Récupérer le token de la réponse
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Envoi de l'erreur à l'état
    }
  }
);

// Thunk pour la déconnexion
export const logout = createAsyncThunk('auth/logout', async () => {
  // Logique de déconnexion (si nécessaire)
  // Vous pouvez ajouter ici une API de déconnexion si besoin
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null; // Réinitialiser les erreurs
    },
    // Autres reducers synchrones peuvent être ajoutés ici
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'LOADING'; // État de chargement
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED'; // Connexion réussie
        state.isConnected = true;
        state.token = action.payload; // Stocker le token
        state.error = null; // Pas d'erreur
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'FAILED'; // Connexion échouée
        state.isConnected = false;
        state.error = action.payload; // Enregistrer l'erreur
      })
      .addCase(logout.fulfilled, (state) => {
        // Lors de la déconnexion, réinitialiser l'état
        return initialState; // Réinitialiser l'état à l'état initial
      });
  },
});

// Exporter les actions
export const { resetError } = authSlice.actions;

// Exporter le reducer
export default authSlice.reducer;
