import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const location = useLocation();
  const path = location?.pathname.split("/");
  const isHome = path.includes("home");
  const [homeClass, setHomeClass] = useState<string>(isHome ? "home" : "out");

  useEffect(() => {
    setHomeClass(isHome ? "home" : "out");
  }, [location]);

  return (
    <main className="w-full">
      {isHome && <Header />}
      <section
        className={`w-full flex flex-row justify-start items-start ${homeClass}`}>
        <Outlet />
      </section>
      {isHome && <Footer />}
    </main>
  );
};

export default AuthLayout;
