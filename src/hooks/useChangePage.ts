import { ENUMs } from "@/lib/enum";
import { useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

// Define the breakpoints based on Tailwind CSS

const useChangePage = (): void => {
  const location = useLocation();

  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    setSearchParam((prev) => {
      const params = new URLSearchParams(prev);
      params.set(ENUMs.SEARCH_PARAM as string, "");
      return params;
    });
    return () => {};
  }, [location.pathname]);
};

export default useChangePage;
