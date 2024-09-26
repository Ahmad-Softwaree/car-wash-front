import { CalculatorProps } from "@/types/global";
import MyButton from "@/components/ui/MyButton";
import Chip from "@mui/joy/Chip";
import {
  Banknote,
  Calculator,
  CircleDollarSign,
  HandCoins,
} from "lucide-react";
import Label from "./Label";
import InputGroup from "./InputGroup";
import InputAddon from "./InputAddon";
import Input from "./Input";
import { useState } from "react";

const CalculatorModal = ({ money }: CalculatorProps) => {
  const [value, setValue] = useState<number>(0);

  const amounts: number[] = [1000, 5000, 10000, 250000, 50000, 100000];

  return (
    <div className="w-full  h-full flex flex-col justify-center bg-transparent items-center gap-5">
      <Chip variant="soft" color="warning">
        <Calculator className="w-11 h-11 p-2 cursor-pointer" />
      </Chip>
      <p className="w-full text-center text-md text-black">بژمێر</p>

      <div className="w-full  flex flex-col gap-2">
        <Label className="w-full text-sm  flex flex-row gap-2">
          <p>نرخ</p>
        </Label>
        <InputGroup className="w-full text-input 0">
          <InputAddon className="w-[20%] md:w-[10%]">
            <CircleDollarSign />
          </InputAddon>

          <Input
            value={money || 0}
            name="money"
            disabled
            type="text"
            dir="ltr"
            className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
          />
        </InputGroup>
      </div>
      <div className="w-full  flex flex-col gap-2">
        <Label className="w-full text-sm  flex flex-row gap-2">
          <p>پێدان</p>
        </Label>
        <InputGroup className="w-full text-input 0">
          <InputAddon className="w-[20%] md:w-[10%]">
            <HandCoins />
          </InputAddon>

          <Input
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            name="value"
            type="number"
            dir="ltr"
            className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
          />
        </InputGroup>
      </div>
      <div className="w-full  flex flex-col gap-2">
        <Label className="w-full text-sm  flex flex-row gap-2">
          <p>باقی</p>
        </Label>
        <InputGroup className="w-full text-input 0">
          <InputAddon className="w-[20%] md:w-[10%]">
            <Banknote />
          </InputAddon>

          <Input
            value={value - money < 0 ? 0 : money ? value - money : 0}
            name="money"
            disabled
            type="text"
            dir="ltr"
            className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
          />
        </InputGroup>
      </div>

      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap">
        {amounts.map((val: number, _index: number) => (
          <button
            onClick={() => setValue((prev) => prev + val)}
            className="p-2 px-4 rounded-md default-border dark-light hover:light-dark transition-all duration-200">
            {val}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorModal;
