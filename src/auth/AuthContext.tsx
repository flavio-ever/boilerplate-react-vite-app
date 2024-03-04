import { createContext } from 'react';

export type AuthState = {
  name: string;
  role: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthContextProps = {
  user: AuthState | null;
  // eslint-disable-next-line no-unused-vars
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
};

export const AuthContext = createContext<AuthContextProps | null>(null);
