import { ReturnProps } from "@/types/global";
import { CircleChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Return = ({ link = "/home", children }: ReturnProps) => {
  return (
    <div className="flex flex-row justify-center items-center gap-3">
      <Link replace to={link}>
        <CircleChevronRight />
      </Link>
      <p className="font-bold text-md md:text-xl font-rabar007 whitespace-nowrap">
        {children}
      </p>
    </div>
  );
};

export default Return;
