import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { authHooks } from "../hooks";
import { Users } from "../openapi";

interface AuthContextType {
  user: Users | undefined;
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
  const [user, setUser] = useState<Users | undefined>(undefined); // ✅ Correct type
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const {
    data: meData,
    isLoading: isMeLoading,
    error: meError,
  } = authHooks.useFetchMeData();

  useEffect(() => {
    if (!isMeLoading) {
      if (meData?.username) {
        setUser(meData);
        setIsAuthenticated(true);
        setIsAuthLoading(false);
      } else {
        setUser(undefined);
        setIsAuthenticated(false);
        setIsAuthLoading(true);
      }

      if (meError) {
        setIsAuthLoading(false);
      }
    }
  }, [meData, isMeLoading, meError]);

  const contextValue = useMemo(
    () => ({ isAuthenticated, user, isAuthLoading }),
    [isAuthenticated, user, isAuthLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
