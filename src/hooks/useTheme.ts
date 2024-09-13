import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTheme = (): void => {
  const location = useLocation();

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    let mode = document.getElementsByTagName("html")[0];

    if (theme == "dark") {
      localStorage.setItem("theme", "dark");
      mode.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      mode.classList.remove("dark");
    }
    return () => {};
  }, [location]);
};

export default useTheme;
