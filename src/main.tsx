import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { QueryProvider } from "./lib/react-query/QueryProvider.jsx";
import Context from "./context/Context.js";
import { Toaster } from "./components/ui/toaster.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SellPdf from "./components/pdf/SellPdf.js";
import SellReportPdf from "./components/pdf/SellReportPdf.js";
import ItemReportPdf from "./components/pdf/ItemReportPdf.js";
import KogaAllReportPdf from "./components/pdf/KogaAllReportPdf.js";
import KogaNullReportPdf from "./components/pdf/KogaNullReportPdf.js";
import KogaMovementReportPdf from "./components/pdf/KogaMovementReportPdf.js";
import BillProfitReportPdf from "./components/pdf/BillProfitReportPdf.js";
import ItemProfitReportPdf from "./components/pdf/ItemProfitReportPdf.js";
import ExpenseReportPdf from "./components/pdf/ExpenseReportPdf.js";
import CaseReportPdf from "./components/pdf/CaseReportPdf.js";
import ReservationReportPdf from "./components/pdf/ReservationReportPdf.js";
ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <QueryProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Context>
        <Toaster />
        <SellPdf />
        <SellReportPdf />
        <ItemReportPdf />
        <KogaAllReportPdf />
        <KogaNullReportPdf />
        <KogaMovementReportPdf />
        <BillProfitReportPdf />
        <ItemProfitReportPdf />
        <ExpenseReportPdf />
        <CaseReportPdf />
        <ReservationReportPdf />
        <App />
      </Context>
    </LocalizationProvider>
  </QueryProvider>
  //</React.StrictMode>
);
