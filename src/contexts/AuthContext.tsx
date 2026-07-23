import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initThoughtSpot } from '../lib/thoughtspot';

interface AuthState {
  username: string;
  password: string;
  isLoggedIn: boolean;
}

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'airbnb_ts_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthState;
        return { ...parsed, isLoggedIn: true };
      }
    } catch {
      // ignore
    }
    return { username: '', password: '', isLoggedIn: false };
  });

  useEffect(() => {
    if (auth.isLoggedIn && auth.username && auth.password) {
      initThoughtSpot(auth.username, auth.password);
    }
  }, [auth.isLoggedIn, auth.username, auth.password]);

  function login(username: string, password: string) {
    const next: AuthState = { username, password, isLoggedIn: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, password }));
    setAuth(next);
    initThoughtSpot(username, password);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setAuth({ username: '', password: '', isLoggedIn: false });
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
