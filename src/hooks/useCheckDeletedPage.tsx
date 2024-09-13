import { ENUMs } from "@/lib/enum";
import { useLocation } from "react-router-dom";

const useCheckDeletedPage = () => {
  const deleted_page = useLocation()
    .pathname.split("/")
    .map(decodeURIComponent)
    .includes(ENUMs.DELETED_SECTION as string);
  return { deleted_page };
};

export default useCheckDeletedPage;
