import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { QueryProvider } from "./lib/react-query/QueryProvider.jsx";
import Context from "./context/Context.js";
import { Toaster } from "./components/ui/toaster.js";
ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <QueryProvider>
    {/* <ChakraUIProvider> */}
    <Context>
      <Toaster />
      <App />
    </Context>
    {/* </ChakraUIProvider> */}
  </QueryProvider>
  //</React.StrictMode>
);
