import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './type.actions';

/* Actions d'authentification */

// Action pour la connexion réussie
export const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS, // Type d'action: LOGIN_SUCCESS
    payload: token, // Jeton en tant que charge utile
  };
};

// Action pour la connexion échouée
export const loginFailed = (error) => {
  return {
    type: LOGIN_FAIL, // Type d'action: LOGIN_FAIL
    payload: error, // Erreur en tant que charge utile
  };
};

// Action pour la déconnexion
export const logout = () => {
  return {
    type: LOGOUT, // Type d'action: LOGOUT
  };
};
