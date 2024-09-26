import { ENUMs } from "@/lib/enum";
import { useLocation } from "react-router-dom";

const useCheckReportPage = () => {
  const report_page = useLocation()
    .pathname.split("/")
    .map(decodeURIComponent)
    .includes(ENUMs.REPORT_SECTION as string);
  return { report_page };
};

export default useCheckReportPage;
