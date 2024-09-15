import { useSearchParams } from "react-router-dom";
import CustomClose from "./CustomClose";
import FromPicker from "./FromPicker";
import ToPicker from "./ToPicker";
import { ENUMs } from "@/lib/enum";

const DatePicker = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  let from = searchParam.get(ENUMs.FROM_PARAM as string);
  let to = searchParam.get(ENUMs.TO_PARAM as string);

  return (
    <div className="flex flex-row justify-start items-center gap-5 flex-wrap">
      <div className="flex flex-row justify-center items-center gap-5 flex-wrap">
        <p>لە</p>
        <FromPicker />
      </div>
      <div className="flex flex-row justify-center items-center gap-5 flex-wrap">
        <p>بۆ</p>
        <ToPicker />
      </div>
      {(from || to) && (
        <CustomClose
          onClick={() => {
            setSearchParam((prev) => {
              const params = new URLSearchParams(prev);
              params.delete(ENUMs.TO_PARAM as string);
              params.delete(ENUMs.FROM_PARAM as string);

              return params;
            });
          }}
        />
      )}
    </div>
  );
};

export default DatePicker;
