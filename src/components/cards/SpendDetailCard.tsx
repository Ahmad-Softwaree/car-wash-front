import { CalendarRange, CircleUserRound } from "lucide-react";
import { formatDateToDDMMYY } from "@/lib/functions";
import Input from "@/components/ui/Input";
import Textarea from "../ui/Textarea";
import { Spend } from "@/types/spend";
import InputGroup from "@/components/ui/InputGroup";
import Label from "../ui/Label";
import { formatMoney } from "../shared/FormatMoney";
const SpendDetailCard = ({
  title,
  id,
  amount,
  spend_by,
  employee,
  date,
  note,
  fromCase,
}: Spend) => {
  return (
    <article
      id={id.toLocaleString()}
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none ">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-bold font-rabar007 text-lg text-nowrap">خەرجی</p>

        <div className="flex flex-row justify-end items-center gap-5 md:gap-10 flex-wrap">
          <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
            <CircleUserRound />
            <p className="text-md  font-poppins">{employee}</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
            <CalendarRange />
            <p className="text-md  font-poppins">
              {formatDateToDDMMYY(date.toLocaleString())}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4">
        <InputGroup className="w-full text-input">
          <Input
            defaultValue={title}
            disabled
            name="title"
            placeholder="سەردێر"
            className="w-full bg-transparent"
          />
        </InputGroup>

        <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
          <InputGroup className="w-full text-input  lg:w-[35%]">
            <Input
              defaultValue={formatMoney(amount)}
              disabled
              name="amount"
              placeholder="بڕی پارەی خەرجکراو"
              className="w-full bg-transparent"
            />
          </InputGroup>
          <InputGroup className="w-full text-input  lg:w-[35%]">
            <Input
              defaultValue={spend_by}
              disabled
              name="spend_by"
              placeholder="لەلایەن"
              className="w-full bg-transparent"
            />
          </InputGroup>

          <InputGroup className="checkbox-input">
            <Label htmlFor="fromCase">دەرکردنی پارە لە قاسە</Label>
            <Input
              type="checkbox"
              checked={fromCase}
              disabled
              id="fromCase"
              name="fromCase"
              placeholder="بڕی پارەی خەرجکراو"
              className="w-full bg-transparent"
            />
          </InputGroup>
        </div>
        <InputGroup className="w-full text-input">
          <Textarea
            defaultValue={note}
            disabled
            name="note"
            rows={10}
            placeholder="تێبینی"
            className="w-full bg-transparent"
          />
        </InputGroup>
      </div>
    </article>
  );
};

export default SpendDetailCard;
