import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import { ENUMs } from "@/lib/enum";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

// Define the breakpoints based on Tailwind CSS

const useChangePage = (): void => {
  const location = useLocation();
  const { dispatch } = useGlobalContext();

  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    dispatch({
      type: CONTEXT_TYPEs.CHECK,
      payload: [],
    });
    setSearchParam((prev) => {
      const params = new URLSearchParams(prev);
      params.delete(ENUMs.SEARCH_PARAM as string);
      params.delete(ENUMs.FILTER_PARAM as string);
      params.delete(ENUMs.ITEM_TYPE_PARAM as string);
      params.delete(ENUMs.EXPENSE_TYPE_PARAM as string);
      params.delete(ENUMs.TABLE_NAME_PARAM as string);
      params.delete(ENUMs.ROLE_FILTER_PARAM as string);

      params.delete(ENUMs.FROM_PARAM as string);

      params.delete(ENUMs.TO_PARAM as string);

      return params;
    });
    return () => {};
  }, [location.pathname]);
};

export default useChangePage;
