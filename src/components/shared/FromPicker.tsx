import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import { parseDateToTimestamp } from "@/lib/functions";
import dayjs, { Dayjs } from "dayjs";
import { useGlobalContext } from "@/context/GlobalContext";
import { Box } from "@mui/joy";
import useScreenSize from "@/hooks/useScreenSize";
import Input from "../ui/Input";
const FromPicker = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { size } = useScreenSize();
  const {
    state: { theme },
  } = useGlobalContext();
  const dateString = searchParam.get(ENUMs.FROM_PARAM as string);
  const dateValue: Dayjs | null = dateString
    ? dayjs(parseInt(dateString, 10))
    : null;
  return <Input type="date"></Input>;
};

export default FromPicker;
