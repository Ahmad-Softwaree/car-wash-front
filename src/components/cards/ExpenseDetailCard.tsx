import { ExpenseCardProps } from "@/types/expense";
import { FormFinalOperation } from "@/types/global";

import {
  Calendar,
  CircleDollarSign,
  HandCoins,
  Key,
  Phone,
  User,
} from "lucide-react";
import InputGroup from "../ui/InputGroup";
import InputAddon from "../ui/InputAddon";
import Label from "../ui/Label";
import Input from "../ui/Input";
import { formatDateToDDMMYY } from "@/lib/functions";

const ExpenseDetailCard = ({
  onClose,
  price,
  date,
  type_name,
  id,
}: FormFinalOperation & ExpenseCardProps) => {
  return (
    <div className="space-y-4  dark-light  rounded-lg default-border bg-transparent py-2 w-full max-w-2xl shadow-4xl">
      <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
        <p className="text-sm">زانیاری خەرجی</p>
      </div>

      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>بڕی خەرجکراو</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <CircleDollarSign />
            </InputAddon>

            <Input
              value={price}
              name="price"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>جۆری خەرجی</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <HandCoins />
            </InputAddon>

            <Input
              value={type_name}
              name="type_name"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>

      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Label className="w-full text-sm  flex flex-row gap-2">
            <p>بەروار</p>
          </Label>
          <InputGroup className="w-full text-input 0">
            <InputAddon className="w-[20%] md:w-[10%]">
              <Calendar />
            </InputAddon>

            <Input
              value={formatDateToDDMMYY(date as string)}
              name="date"
              disabled
              type="text"
              dir="ltr"
              className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetailCard;
