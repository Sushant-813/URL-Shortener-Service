import { create } from "zustand";

import { AUTH_TOKEN_STORAGE_KEY } from "../constants/storage";
import {
  decodeJwt,
  extractRoles,
  extractUsername,
  isTokenExpired,
} from "../utils/jwt";

const EMPTY_AUTH_STATE = {
  token: null,
  username: null,
  roles: [],
  isAuthenticated: false,
};

function getSessionState(token) {
  if (typeof token !== "string" || !token.trim()) {
    return null;
  }

  const normalizedToken = token.trim();
  const payload = decodeJwt(normalizedToken);

  if (!payload || isTokenExpired(payload)) {
    return null;
  }

  const username = extractUsername(payload);

  if (!username) {
    return null;
  }

  return {
    token: normalizedToken,
    username,
    roles: extractRoles(payload),
    isAuthenticated: true,
  };
}

function removeStoredToken() {
  try {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    // Authentication state remains cleared if browser storage is unavailable.
  }
}

function getStoredToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeToken(token) {
  try {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    return true;
  } catch {
    return false;
  }
}

const useAuthStore = create((set) => ({
  ...EMPTY_AUTH_STATE,

  login: (token) => {
    const sessionState = getSessionState(token);

    if (!sessionState || !storeToken(sessionState.token)) {
      removeStoredToken();
      set(EMPTY_AUTH_STATE);
      return;
    }

    set(sessionState);
  },

  logout: () => {
    removeStoredToken();
    set(EMPTY_AUTH_STATE);
  },

  restoreSession: () => {
    const sessionState = getSessionState(getStoredToken());

    if (!sessionState) {
      removeStoredToken();
      set(EMPTY_AUTH_STATE);
      return;
    }

    set(sessionState);
  },
}));

export default useAuthStore;
