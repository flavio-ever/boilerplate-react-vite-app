import React, { createContext, useState, useCallback, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrigido
import { toast } from 'react-toastify';

import api from '../services/api.service';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthState = {
  name: string;
  role: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthContextProps = {
  user: AuthState | null;
  // eslint-disable-next-line no-unused-vars
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
};

type AuthPayloadResponseDTO = {
  userId: string;
  companyId: string;
  name: string;
  type: 'token' | 'refresh-token';
  role: string;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthState | null>(() => {
    const name = localStorage.getItem('@app:name');
    const role = localStorage.getItem('@app:role');

    if (name && role) {
      return { name, role };
    }

    return null;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('auth/login', {
      email,
      password,
    });

    const { name, role } = jwtDecode<AuthPayloadResponseDTO>(response.data.access_token); // Corrigido

    localStorage.setItem('@app:name', name);
    localStorage.setItem('@app:role', role);
    localStorage.setItem('@app:access_token', btoa(JSON.stringify(response.data.access_token)));
    localStorage.setItem('@app:refresh_token', btoa(JSON.stringify(response.data.refresh_token)));

    api.defaults.headers.authorization = `Bearer ${response.data.access_token}`;

    setUser({ name, role });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@app:name');
    localStorage.removeItem('@app:role');
    localStorage.removeItem('@app:access_token');
    localStorage.removeItem('@app:refresh_token');

    setUser(null);
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
          toast.error(error.response.data.message, {
            position: 'top-center',
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          signOut();
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [signOut]);

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};
