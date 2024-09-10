import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { QueryProvider } from "./lib/react-query/QueryProvider.jsx";
import Context from "./context/Context.js";
import { Toaster } from "./components/ui/toaster.js";
import { ThemeProvider } from "./components/ui/theme-provider.js";
ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryProvider>
      <Context>
        <Toaster />
        <App />
      </Context>
    </QueryProvider>
  </ThemeProvider>

  //</React.StrictMode>
);
