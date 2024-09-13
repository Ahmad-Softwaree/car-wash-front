import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import useChangePage from "@/hooks/useChangePage";
import useTheme from "@/hooks/useTheme";

const AuthLayout = () => {
  useTheme();
  useChangePage();
  const location = useLocation();
  const path = location?.pathname.split("/");
  const isHome = path.includes("home");
  const [homeClass, setHomeClass] = useState<string>(isHome ? "home" : "out");

  useEffect(() => {
    setHomeClass(isHome ? "home" : "out");
  }, [location]);

  return (
    <main className="w-full">
      <Sidebar />

      {/* Main content area */}
      <div className={`flex-1 transition-all duration-300 lg:pr-[250px]`}>
        <Header />
        <section
          className={`w-full flex flex-row justify-start items-start ${homeClass}`}>
          <Outlet />
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default AuthLayout;
