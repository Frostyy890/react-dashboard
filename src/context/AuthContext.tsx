import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface UserCredentials {
  email: string;
  password: string;
}

export enum FormMode {
  SIGNIN = "login",
  SIGNUP = "register",
}

export type AuthContextType = {
  token: string | null;
  isLoggedIn: boolean;
  handleAuth: (
    userCredentials: UserCredentials,
    formMode: FormMode
  ) => Promise<void>;
  handleLogout: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);
const AuthProvider = ({ children }: Props) => {
  const baseURL = "http://localhost:3002/api/auth";
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(!!token);
  const navigate = useNavigate();
  const handleAuth = async (
    userCredentials: UserCredentials,
    formMode: FormMode
  ) => {
    try {
      const res = await axios.post(`${baseURL}/${formMode}`, userCredentials);
      console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { errors } = err.response?.data;
        errors.forEach((error: any) => {
          console.error(error);
          alert(error.message);
        });
        return;
      }
      console.error(err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{ token, handleAuth, handleLogout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => React.useContext(AuthContext);
