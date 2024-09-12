import Input from "@/components/ui/Input";
import Textarea from "../ui/Textarea";
import { Expense } from "@/types/expense";
import InputGroup from "@/components/ui/InputGroup";
import { formatMoney } from "../shared/FormatMoney";
const ExpenseDetailCard = ({ price, note, type, id, date }: Expense) => {
  return (
    <article
      id={id.toLocaleString()}
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none ">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-bold font-bukra text-lg text-nowrap">خەرجی</p>
      </div>
      <div className="w-full space-y-4">
        <InputGroup className="w-full text-input">
          <Input
            defaultValue={type}
            disabled
            name="type"
            placeholder="جۆر"
            className="w-full bg-transparent"
          />
        </InputGroup>

        <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
          <InputGroup className="w-full text-input  lg:w-[35%]">
            <Input
              defaultValue={formatMoney(price)}
              disabled
              name="amount"
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

export default ExpenseDetailCard;
