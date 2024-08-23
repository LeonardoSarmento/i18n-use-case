import { LoginType } from '@services/types/Login';
import { sleep } from '@services/utils/utils';
import * as React from 'react';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (login: LoginType, token: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  user: string | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = 'boilerplate.auth.user';

export function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

const keyToken = 'boilerplate.auth.token';

export function getStoredToken() {
  return localStorage.getItem(keyToken);
}

function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(keyToken, token);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(getStoredUser());
  const [token, setToken] = React.useState<string | null>(getStoredToken());
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    await sleep(250);

    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (login: LoginType, token: string) => {
    await sleep(500);

    setStoredUser(login.username);
    setUser(login.username);
    setStoredToken(token);
    setToken(token);
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
    setToken(getStoredToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, token }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
