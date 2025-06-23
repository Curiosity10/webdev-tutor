'use client';

import { createContext, useContext, ReactNode } from 'react';

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // MVP: Placeholder auth state
  // TODO: Integrate with NextAuth.js
  const user: User | null = null;
  const isAuthenticated = false;

  const login = () => {
    // TODO: Implement NextAuth.js signIn
    console.log('Login clicked');
  };

  const logout = () => {
    // TODO: Implement NextAuth.js signOut
    console.log('Logout clicked');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
