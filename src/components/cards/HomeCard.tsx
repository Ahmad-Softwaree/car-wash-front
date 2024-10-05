import { CardContent } from "@mui/joy";
import FormatMoney from "../shared/FormatMoney";
import { ReactElement } from "react";

const HomeCard = ({
  data,
  deleted,
  text,
  icon,
}: {
  data: any;
  deleted: any;
  text: string;
  icon: ReactElement;
}) => {
  return (
    <CardContent orientation="horizontal">
      <div className="flex flex-row justify-center items-center p-4 rounded-lg bg-black-500 bg-opacity-40 h-[70px] w-[70px]">
        {icon}
      </div>
      <CardContent>
        <p className="!font-bukra">{text}</p>

        <p className="!font-bukra text-sm flex flex-row justify-start items-center gap-2 text-red-200">
          هەبوو : <FormatMoney className="text-2xl">{Number(data)}</FormatMoney>
        </p>
        <p className="!font-bukra text-sm flex flex-row justify-start items-center gap-2 text-red-200">
          سڕاوە :{" "}
          <FormatMoney className="text-2xl">{Number(deleted)}</FormatMoney>
        </p>
      </CardContent>
    </CardContent>
  );
};

export default HomeCard;
