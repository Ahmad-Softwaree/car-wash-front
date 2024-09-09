import { memo, ReactElement } from "react";
import { AuthContextProvider } from "./AuthContext";
import { GlobalContextProvider } from "./GlobalContext";

const Context = memo(({ children }: { children: ReactElement | any }) => {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </GlobalContextProvider>
  );
});

export default Context;
