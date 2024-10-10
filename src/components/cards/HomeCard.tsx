import FormatMoney from "../shared/FormatMoney";
import { ReactElement } from "react";

const HomeCard = ({
  data,
  text,
  icon,
}: {
  data: any;
  text: string;
  icon: ReactElement;
}) => {
  return (
    <div className="col-span-full md:col-span-4 xl:col-span-3 h-[150px] md:h-[200px] !bg-[#0e1214] !text-white rounded-lg p-2 py-4 flex flex-col justify-start items-center gap-5 px-3 dark:shadow-none shadow-md shadow-black-500">
      <div className="flex flex-row justify-center  items-center dark-light  rounded-full p-4 text-2xl md:text-4xl">
        {icon}
      </div>

      <div className="flex flex-col justify-center items-center gap-1">
        <p className="!font-bukra  flex flex-row justify-start items-center gap-2 font-bold my-0">
          <FormatMoney className="text-xl md:text-3xl font-bold my-0">
            {Number(data)}
          </FormatMoney>
        </p>
        <small className="text-xs opacity-80">{text}</small>
      </div>
    </div>
  );
};

export default HomeCard;
