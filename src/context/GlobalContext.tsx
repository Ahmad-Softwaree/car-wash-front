import {
  Context,
  Dispatch,
  ReactElement,
  createContext,
  useContext,
  useReducer,
} from "react";
import { globalReducer, globalState } from "./reducers/global.reducer";
import { GlobalContextType, GlobalStateType } from "@/types/global";

export const GlobalContext: Context<any> =
  createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [state, dispatch]: [GlobalStateType, Dispatch<any>] = useReducer(
    globalReducer,
    globalState
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  const { state, dispatch } = context;

  return { state, dispatch };
};
