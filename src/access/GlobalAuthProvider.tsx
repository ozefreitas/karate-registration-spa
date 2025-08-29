import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useFetchMeData } from "../hooks/useAuth";
import { AxiosResponse } from "axios";

interface User {
  username: string;
  role: string
}

interface AuthContextType {
  user: AxiosResponse<any, any> | undefined;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isAuthenticated: false,
  isAuthLoading: true,
});

export const GlobalAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AxiosResponse<any, any> | undefined>(undefined);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)
  const { data: meData, isLoading: isMeLoading, error: meError } = useFetchMeData();

  useEffect(() => {
    if (!isMeLoading) {
      if (meData && meData?.data.username) {
        setUser(meData);
        setIsAuthenticated(true);
        setIsAuthLoading(false)
      } else {
        setUser(undefined);
        setIsAuthenticated(false);
        setIsAuthLoading(true)
      }

      if (meError) {
        setIsAuthLoading(false)
      }
    }
  }, [meData, isMeLoading]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
