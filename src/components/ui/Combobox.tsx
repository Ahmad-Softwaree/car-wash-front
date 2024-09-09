import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { ComboboxProps, ComboboxExtendTypes } from "@/types/global";
import MyButton from "./MyButton";
import InputGroup from "./InputGroup";

export function Combobox<T extends ComboboxExtendTypes>({
  data,
  onSelect,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);
  const [holder, setHolder] = React.useState<string>("");
  return (
    <InputGroup className="relative">
      <MyButton
        type="button"
        role="combobox"
        onClick={() => setOpen(!open)}
        className="justify-between border-2 border-solid bg-white text-black hover:!bg-white h-full border-gray-200  rounded-md  p-3 w-full  flex  flex-row    items-center  gap-3">
        {value != 0 ? holder : "هەڵبژاردنی کارمەند"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </MyButton>

      {open && (
        <div className=" w-full  absolute bg-white max-h-[200px] shadow-md p-2  overflow-y-auto flex flex-col gap-4">
          {data?.map((one: T) => (
            <MyButton
              name="roleButton"
              type="button"
              className="w-full text-right"
              key={one.id}
              onClick={() => {
                setValue(Number(one.id) == value ? 0 : Number(one.id));
                setOpen(false);
                onSelect(one.id, setHolder, one);
              }}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === one.id ? "opacity-100" : "opacity-0"
                )}
              />
              <p className="w-full text-right">
                {one.first_name} {one.last_name}
              </p>
            </MyButton>
          ))}
        </div>
      )}
    </InputGroup>
  );
}
