import { createContext, useContext } from 'react';

interface IUser {
  id: string;
  uuid: string;
  email: number;
  name: string;
}

interface Props {
  children: React.ReactNode;
  value: IUser;
}

// @ts-ignore
const AuthContext = createContext<IUser>();

export function AuthProvider({ children, value }: Props) {
  // value recebe o usuário logado
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}