import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import useChangePage from "@/hooks/useChangePage";
import useTheme from "@/hooks/useTheme";
import useScreenSize from "@/hooks/useScreenSize";
import { ENUMs } from "@/lib/enum";

const AuthLayout = () => {
  useTheme();
  useChangePage();
  const { size } = useScreenSize();
  const location = useLocation();
  const path = location?.pathname.split("/");
  const isHome = path.includes(ENUMs.DASHBOARD_PART as string);
  const [homeClass, setHomeClass] = useState<string>(isHome ? "home" : "out");
  const [shrink, setShrink] = useState<boolean>(
    localStorage.getItem("shrink") == "yes" || false
  );
  useEffect(() => {
    if (size == "xs" || size == "sm" || size == "md") {
      setShrink(false);
      localStorage.setItem("shrink", "no");
    }
  }, [size]);
  useEffect(() => {
    setHomeClass(isHome ? "home" : "out");
  }, [location]);

  return (
    <main className="w-full">
      <Sidebar shrink={shrink} setShrink={setShrink} />

      {/* Main content area */}
      <div
        className={`flex-1 transition-all duration-300  lg:pr-[270px] ${
          shrink && "!pr-[80px] lg:!pr-[60px] xl:!pr-[20px]"
        }`}
      >
        <Header />
        <section
          className={`w-full flex flex-row justify-start items-start ${homeClass}`}
        >
          <Outlet />
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default AuthLayout;
