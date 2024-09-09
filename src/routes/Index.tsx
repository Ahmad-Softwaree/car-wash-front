import Clients from "@/pages/_auth/Clients";
import CreatePsula from "@/pages/_auth/CreatePsula";
import Less from "@/pages/_auth/Less";
import CheckPart from "@/providers/CheckPart";
import { lazy } from "react";

import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
const RootLayout = lazy(() => import("@/pages/_root/RootLayout"));
const AuthRouterProvider = lazy(() => import("@/providers/AuthRouterProvider"));
const UserNullRouterProvider = lazy(
  () => import("@/providers/UserNullRouterProvider")
);

const Login = lazy(() => import("@/pages/_root/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Error = lazy(() => import("@/pages/Error"));

const Case = lazy(() => import("@/pages/_auth/Case"));
const Setting = lazy(() => import("@/pages/_auth/Setting"));
const Report = lazy(() => import("@/pages/_auth/Report"));
const Spend = lazy(() => import("@/pages/_auth/Spend"));
const Users = lazy(() => import("@/pages/_auth/Users"));

const Home = lazy(() => import("@/pages/_auth/Home"));
const AddProduct = lazy(() => import("@/pages/_auth/AddProduct"));
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
            element={<Navigate replace to={`/home`} />}
          />
          <Route
            path="home"
            errorElement={<Error />}
            element={<CheckPart part="all" Component={Home} />}
          />
          <Route
            path="add"
            errorElement={<Error />}
            element={<CheckPart part="داغڵکردنی مواد" Component={AddProduct} />}
          />
          <Route
            path="case"
            errorElement={<Error />}
            element={<CheckPart part="قاصە" Component={Case} />}
          />
          <Route
            path="setting"
            errorElement={<Error />}
            element={<Setting />}
          />
          <Route
            path="report"
            errorElement={<Error />}
            element={<CheckPart part="ڕاپۆرت" Component={Report} />}
          />
          <Route
            path="spend"
            errorElement={<Error />}
            element={<CheckPart part="خەرجی" Component={Spend} />}
          />
          <Route
            path="users"
            errorElement={<Error />}
            element={<CheckPart part="بەکارهێنەران" Component={Users} />}
          />
          <Route
            path="clients"
            errorElement={<Error />}
            element={<CheckPart part="کڕیارەکان" Component={Clients} />}
          />
          <Route
            path="less"
            errorElement={<Error />}
            element={<CheckPart part="موادی کەمبوو" Component={Less} />}
          />
          <Route
            path="create-psula"
            errorElement={<Error />}
            element={
              <CheckPart part="دروستکردنی پسولە" Component={CreatePsula} />
            }
          />
        </Route>
      </>
      <Route errorElement={<Error />} element={<NotFound />} path="*" />
    </>
  )
);

export default router;
