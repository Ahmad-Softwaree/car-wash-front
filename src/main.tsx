import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { QueryProvider } from "./lib/react-query/QueryProvider.jsx";
import Context from "./context/Context.js";
import { Toaster } from "./components/ui/toaster.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <QueryProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Context>
        <Toaster />
        <App />
      </Context>
    </LocalizationProvider>
  </QueryProvider>

  //</React.StrictMode>
);
