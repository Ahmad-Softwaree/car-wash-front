import Customers from "@/pages/_auth/Customers";
import CreatePsula from "@/pages/_auth/CreatePsula";
import CheckPart from "@/providers/CheckPart";
import { lazy } from "react";

import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Koga from "@/pages/_auth/Koga";
import Profile from "@/pages/_auth/Profile";
const RootLayout = lazy(() => import("@/pages/_root/RootLayout"));
const AuthRouterProvider = lazy(() => import("@/providers/AuthRouterProvider"));
const UserNullRouterProvider = lazy(
  () => import("@/providers/UserNullRouterProvider")
);

const Login = lazy(() => import("@/pages/_root/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Error = lazy(() => import("@/pages/Error"));

const Report = lazy(() => import("@/pages/_auth/Report"));
const Expense = lazy(() => import("@/pages/_auth/Expense"));
const Users = lazy(() => import("@/pages/_auth/Users"));

const Home = lazy(() => import("@/pages/_auth/Home"));
const AddItem = lazy(() => import("@/pages/_auth/AddItem"));
const AuthLayout = lazy(() => import("@/pages/_auth/layout/AuthLayout"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <>
        {/* Root Routes */}
        <Route
          path="/"
          errorElement={<Error />}
          element={<UserNullRouterProvider Component={RootLayout} />}>
          <Route path="login" errorElement={<Error />} element={<Login />} />
        </Route>
      </>
      <>
        {/* Auth Routes */}
        <Route
          path="/"
          errorElement={<Error />}
          element={<AuthRouterProvider Component={AuthLayout} />}>
          <Route
            index
            errorElement={<Error />}
            element={<Navigate replace to={`/داشبۆرد`} />}
          />
          <Route
            path="داشبۆرد"
            errorElement={<Error />}
            element={<CheckPart part="all" Component={Home} />}
          />

          <Route
            path="کۆگا"
            errorElement={<Error />}
            element={<CheckPart part="کۆگا" Component={Koga} />}
          />
          <Route
            path="داغڵکردنی_مواد"
            errorElement={<Error />}
            element={<CheckPart part="داغڵکردنی مواد" Component={AddItem} />}
          />

          <Route
            path="ڕاپۆرتەکان"
            errorElement={<Error />}
            element={<CheckPart part="ڕاپۆرتەکان" Component={Report} />}
          />
          <Route
            path="خەرجی"
            errorElement={<Error />}
            element={<CheckPart part="خەرجی" Component={Expense} />}
          />
          <Route
            path="بەکارهێنەران"
            errorElement={<Error />}
            element={<CheckPart part="بەکارهێنەران" Component={Users} />}
          />
          <Route
            path="کڕیارەکان"
            errorElement={<Error />}
            element={<CheckPart part="کڕیارەکان" Component={Customers} />}
          />

          <Route
            path="دروستکردنی_پسولە"
            errorElement={<Error />}
            element={
              <CheckPart part="دروستکردنی پسولە" Component={CreatePsula} />
            }
          />
          <Route
            path="پڕۆفایل"
            errorElement={<Error />}
            element={<CheckPart part="all" Component={Profile} />}
          />
        </Route>
      </>
      <Route errorElement={<Error />} element={<NotFound />} path="*" />
    </>
  )
);

export default router;
