import {
  Context,
  Dispatch,
  ReactElement,
  createContext,
  useContext,
  useReducer,
} from "react";
import { authReducer, authState } from "./reducers/auth.reducer";
import { AuthContextType, AuthStateType } from "@/types";

export const AuthContext: Context<any> = createContext<AuthContextType | null>(
  null
);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [state, dispatch]: [AuthStateType, Dispatch<any>] = useReducer(
    authReducer,
    authState
  );

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  const { state, dispatch } = context;

  return { state, dispatch };
};
