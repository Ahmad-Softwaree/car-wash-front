import Customers from "@/pages/_auth/Customers";
import CheckPart from "@/providers/CheckPart";
import { lazy } from "react";

import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Items from "@/pages/_auth/Items";
import Profile from "@/pages/_auth/Profile";
import { ENUMs } from "@/lib/enum";
import Roles from "@/pages/_auth/Roles";
import Colors from "@/pages/_auth/Colors";
import CarModels from "@/pages/_auth/CarModels";
import CarTypes from "@/pages/_auth/CarTypes";
import ItemTypes from "@/pages/_auth/ItemTypes";
import ExpenseTypes from "@/pages/_auth/ExpenseTypes";
import Services from "@/pages/_auth/Services";
import CreatePsula from "@/pages/_auth/CreatePsula";
import Sells from "@/pages/_auth/Sells";
import Reservations from "@/pages/_auth/Reservations";
import Backups from "@/pages/_auth/Backups";
import SellReport from "@/pages/_auth/SellReport";
import KogaReport from "@/pages/_auth/KogaReport";
import ProfitReport from "@/pages/_auth/ProfitReport";
import ExpenseReport from "@/pages/_auth/ExpenseReport";
import CaseReport from "@/pages/_auth/CaseReport";
import Printers from "@/pages/_auth/Printers";
import VultrBackups from "@/pages/_auth/VultrBackups";
import ReservationReport from "@/pages/_auth/ReservationReport";
import Config from "@/pages/_auth/Config";
import ItemLess from "@/pages/_auth/LessItem";
const RootLayout = lazy(() => import("@/pages/_root/RootLayout"));
const AuthRouterProvider = lazy(() => import("@/providers/AuthRouterProvider"));
const UserNullRouterProvider = lazy(
  () => import("@/providers/UserNullRouterProvider")
);

const Login = lazy(() => import("@/pages/_root/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Error = lazy(() => import("@/pages/Error"));

const Expense = lazy(() => import("@/pages/_auth/Expense"));
const Users = lazy(() => import("@/pages/_auth/Users"));

const Home = lazy(() => import("@/pages/_auth/Home"));
const AuthLayout = lazy(() => import("@/pages/_auth/layout/AuthLayout"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Routes */}
      <Route
        path="/"
        errorElement={<Error />}
        element={<UserNullRouterProvider Component={RootLayout} />}
      >
        <Route path="login" errorElement={<Error />} element={<Login />} />
      </Route>

      {/* Auth Routes */}
      <Route
        path="/"
        errorElement={<Error />}
        element={<AuthRouterProvider Component={AuthLayout} />}
      >
        <Route
          index
          errorElement={<Error />}
          element={
            <Navigate
              replace
              to={`${ENUMs.GENERAL_SECTION}/${ENUMs.DASHBOARD_PART}`}
            />
          }
        />
        {/* BACKUP */}
        <Route path={ENUMs.BACKUP_SECTION as string} errorElement={<Error />}>
          <Route
            path={ENUMs.NORMAL_BACKUP_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.NORMAL_BACKUP_PART as string]}
                Component={Backups}
              />
            }
          />
          <Route
            path={ENUMs.SERVER_BACKUP_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.SERVER_BACKUP_PART as string]}
                Component={VultrBackups}
              />
            }
          />
        </Route>

        {/* GENERAL */}
        <Route path={ENUMs.GENERAL_SECTION as string} errorElement={<Error />}>
          <Route
            path={ENUMs.LESS_ITEM_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.LESS_ITEM_PART as string]}
                Component={ItemLess}
              />
            }
          />

          <Route
            path={ENUMs.DASHBOARD_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.DASHBOARD_PART as string, "all"]}
                Component={Home}
              />
            }
          />

          <Route
            path={ENUMs.KOGA_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart part={[ENUMs.KOGA_PART as string]} Component={Items} />
            }
          />
          <Route
            path={ENUMs.CREATE_PSULA_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.CREATE_PSULA_PART as string]}
                Component={CreatePsula}
              />
            }
          />
          <Route
            path={ENUMs.SELL_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart part={[ENUMs.SELL_PART as string]} Component={Sells} />
            }
          />
          <Route
            path={ENUMs.RESERVATION_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.RESERVATION_PART as string]}
                Component={Reservations}
              />
            }
          />
          <Route
            path={ENUMs.EXPENSE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.EXPENSE_PART as string]}
                Component={Expense}
              />
            }
          />
          <Route
            path={ENUMs.CUSTOMER_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.CUSTOMER_PART as string]}
                Component={Customers}
              />
            }
          />
        </Route>

        {/* REPORT */}
        <Route path={ENUMs.REPORT_SECTION as string} errorElement={<Error />}>
          <Route
            path={ENUMs.SELL_REPORT_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.SELL_REPORT_PART as string]}
                Component={SellReport}
              />
            }
          />
          <Route
            path={ENUMs.KOGA_REPORT_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.KOGA_REPORT_PART as string]}
                Component={KogaReport}
              />
            }
          />
          <Route
            path={ENUMs.PROFIT_REPORT_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.PROFIT_REPORT_PART as string]}
                Component={ProfitReport}
              />
            }
          />
          <Route
            path={ENUMs.EXPENSE_REPORT_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.EXPENSE_REPORT_PART as string]}
                Component={ExpenseReport}
              />
            }
          />
          <Route
            path={ENUMs.CASE_REPORT_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.CASE_REPORT_PART as string]}
                Component={CaseReport}
              />
            }
          />
          <Route
            path={ENUMs.RESERVATION_REPORT_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.RESERVATION_REPORT_PART as string]}
                Component={ReservationReport}
              />
            }
          />
        </Route>

        {/* SETTING */}
        <Route path={ENUMs.SETTING_SECTION as string} errorElement={<Error />}>
          <Route
            path={ENUMs.CONFIG_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.CONFIG_PART as string]}
                Component={Config}
              />
            }
          />
          <Route
            path={ENUMs.USERS_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.USERS_PART as string]}
                Component={Users}
              />
            }
          />
          <Route
            path={ENUMs.ROLE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart part={[ENUMs.ROLE_PART as string]} Component={Roles} />
            }
          />
          <Route
            path={ENUMs.COLOR_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.COLOR_PART as string]}
                Component={Colors}
              />
            }
          />
          <Route
            path={ENUMs.CAR_MODEL_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.CAR_MODEL_PART as string]}
                Component={CarModels}
              />
            }
          />
          <Route
            path={ENUMs.CAR_TYPE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.CAR_TYPE_PART as string]}
                Component={CarTypes}
              />
            }
          />
          <Route
            path={ENUMs.ITEM_TYPE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.ITEM_TYPE_PART as string]}
                Component={ItemTypes}
              />
            }
          />
          <Route
            path={ENUMs.EXPENSE_TYPE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.EXPENSE_TYPE_PART as string]}
                Component={ExpenseTypes}
              />
            }
          />
          <Route
            path={ENUMs.SERVICE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.SERVICE_PART as string]}
                Component={Services}
              />
            }
          />
          <Route
            path={ENUMs.PRINTER_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[ENUMs.PRINTER_PART as string]}
                Component={Printers}
              />
            }
          />
        </Route>
        {/* DELETED */}
        <Route path={ENUMs.DELETED_SECTION as string} errorElement={<Error />}>
          <Route
            path={ENUMs.USERS_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.USERS_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Users}
              />
            }
          />
          <Route
            path={ENUMs.RESERVATION_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.RESERVATION_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Reservations}
              />
            }
          />
          <Route
            path={ENUMs.SELL_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.SELL_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Sells}
              />
            }
          />
          <Route
            path={ENUMs.KOGA_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.KOGA_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Items}
              />
            }
          />
          <Route
            path={ENUMs.CUSTOMER_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.CUSTOMER_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Customers}
              />
            }
          />
          <Route
            path={ENUMs.EXPENSE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.EXPENSE_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Expense}
              />
            }
          />
          <Route
            path={ENUMs.ROLE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.ROLE_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Roles}
              />
            }
          />
          <Route
            path={ENUMs.COLOR_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.COLOR_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Colors}
              />
            }
          />
          <Route
            path={ENUMs.PRINTER_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.PRINTER_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Printers}
              />
            }
          />
          <Route
            path={ENUMs.CAR_MODEL_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.CAR_MODEL_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={CarModels}
              />
            }
          />
          <Route
            path={ENUMs.CAR_TYPE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.CAR_TYPE_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={CarTypes}
              />
            }
          />
          <Route
            path={ENUMs.ITEM_TYPE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.ITEM_TYPE_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={ItemTypes}
              />
            }
          />
          <Route
            path={ENUMs.EXPENSE_TYPE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.EXPENSE_TYPE_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={ExpenseTypes}
              />
            }
          />
          <Route
            path={ENUMs.SERVICE_PART as string}
            errorElement={<Error />}
            element={
              <CheckPart
                part={[
                  ENUMs.SERVICE_PART as string,
                  ENUMs.DELETED_SECTION as string,
                ]}
                Component={Services}
              />
            }
          />
        </Route>

        <Route
          path="پڕۆفایل"
          errorElement={<Error />}
          element={<CheckPart part={["all"]} Component={Profile} />}
        />
      </Route>

      <Route errorElement={<Error />} element={<NotFound />} path="*" />
    </>
  )
);

export default router;
