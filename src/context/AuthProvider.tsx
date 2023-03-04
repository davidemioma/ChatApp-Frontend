import React, { createContext, useContext, useState } from "react";

interface AuthUser {
  _id: string;
  username: string;
  email: string;
  profileUrl: string;
  accessToken: string;
}

interface AuthProps {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthProps | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
