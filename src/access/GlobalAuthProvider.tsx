import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { authHooks } from "../hooks";
import { UserDetail } from "../openapi";

interface AuthContextType {
  user: UserDetail | undefined;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isAuthenticated: false,
  isAuthLoading: true,
});

export const GlobalAuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: meData,
    isLoading: isAuthLoading,
  } = authHooks.useFetchMeData();
  const user: UserDetail | undefined = meData?.username ? meData : undefined;
  const isAuthenticated = Boolean(user);

  const contextValue = useMemo(
    () => ({ isAuthenticated, user, isAuthLoading }),
    [isAuthenticated, user, isAuthLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
