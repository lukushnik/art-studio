import {create} from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  phone: string;
}

interface AuthState {
  isAuthorization: boolean;
  user: User | null;
  token?: string;
  setAuthorization: (isAuthorized: boolean) => void;
  setUser: (user: User | null) => void;
  resetAuth: () => void;
}
const isAuth = Cookies.get('accessToken');

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorization: !!isAuth,
  token: isAuth,
  user: null,
  setAuthorization: (isAuthorized: boolean) =>
    set((state: AuthState) => ({
      ...state,
      isAuthorization: isAuthorized,
    })),
  setUser: (user: User | null) =>
    set((state: AuthState) => ({
      ...state,
      user,
      isAuthorization: !!user,
    })),
  resetAuth: () => {
    set(() => ({
      isAuthorization: false,
      user: null,
    }))
    Cookies.remove('accessToken');
  }
}));
