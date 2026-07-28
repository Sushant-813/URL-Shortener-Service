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

let expirationTimerId = null;

function clearExpirationTimer() {
  if (expirationTimerId !== null) {
    window.clearTimeout(expirationTimerId);
    expirationTimerId = null;
  }
}

function scheduleSessionExpiration(token) {
  const payload = decodeJwt(token);
  const expiresAt = payload?.exp * 1000;

  clearExpirationTimer();

  if (!Number.isFinite(expiresAt)) {
    return;
  }

  expirationTimerId = window.setTimeout(() => {
    useAuthStore.getState().logout();
  }, Math.max(0, expiresAt - Date.now()));
}

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
      clearExpirationTimer();
      removeStoredToken();
      set(EMPTY_AUTH_STATE);
      return false;
    }

    set(sessionState);
    scheduleSessionExpiration(sessionState.token);
    return true;
  },

  logout: () => {
    clearExpirationTimer();
    removeStoredToken();
    set(EMPTY_AUTH_STATE);
  },

  restoreSession: () => {
    const sessionState = getSessionState(getStoredToken());

    if (!sessionState) {
      clearExpirationTimer();
      removeStoredToken();
      set(EMPTY_AUTH_STATE);
      return;
    }

    set(sessionState);
    scheduleSessionExpiration(sessionState.token);
  },
}));

export default useAuthStore;
