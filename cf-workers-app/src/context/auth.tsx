import { createContext, useContext, type ReactNode } from 'react';

interface AuthContextValue {
  user: unknown | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const value: AuthContextValue = {
    user: null,
    isLoading: false,
  };
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
