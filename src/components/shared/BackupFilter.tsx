import Label from "../ui/Label";
import Input from "../ui/Input";
import Option from "../ui/Option";
import InputGroup from "../ui/InputGroup";
import { useState } from "react";
import MyButton from "../ui/MyButton";
import { ENUMs } from "@/lib/enum";
import { useSearchParams } from "react-router-dom";
import CustomClose from "./CustomClose";
import { useToast } from "../ui/use-toast";

import DatePicker from "./DatePicker";
import { parseDateToTimestamp } from "@/lib/functions";
import { useGetTableNames } from "@/lib/react-query/query/backup.query";
type NullableDate = Date | null;

const BackupFilter = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [searchParam, setSearchParam] = useSearchParams();
  const { data, isLoading } = useGetTableNames();
  const [selectedValue, setSelectedValue] = useState(
    data?.find(
      (val: string, _index: number) =>
        val.toString() == searchParam.get(ENUMs.TABLE_NAME_PARAM as string)
    ) || ""
  );
  const [selectedStartDate, setSelectedStartDate] = useState<NullableDate>(
    searchParam.get(ENUMs.FROM_PARAM as string)
      ? new Date(Number(searchParam.get(ENUMs.FROM_PARAM as string)) || "")
      : null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<NullableDate>(
    searchParam.get(ENUMs.TO_PARAM as string)
      ? new Date(Number(searchParam.get(ENUMs.TO_PARAM as string)) || "")
      : null
  );
  return (
    <div className="mt-4 space-y-5">
      {data && data.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs">فلتەر بەپیێ جۆری خەرجی</Label>
          <InputGroup className="text-input">
            <Input
              value={selectedValue}
              onChange={(e: any) => setSelectedValue(e.target.value)}
              placeholder="فلتەر"
              className="text-sm w-full"
              type="text"
              list="types"
            />
            {selectedValue != "" && (
              <CustomClose
                onClick={() => {
                  setSelectedValue("");
                }}
              />
            )}
          </InputGroup>
          <datalist className="w-full" id="types">
            {data.map((val: string, _index: number) => (
              <Option className="w-full" key={val} value={val}>
                {val}
              </Option>
            ))}
          </datalist>
        </div>
      )}
      <div className="space-y-2">
        <Label className="text-xs">فلتەر بەپێی بەروار</Label>

        <DatePicker
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
          setSelectedStartDate={setSelectedStartDate}
        />
      </div>
      <MyButton
        type="button"
        onClick={() => {
          setSearchParam((prev: any) => {
            const params = new URLSearchParams(prev);
            const selectedItem = data?.find(
              (val: string) => val === selectedValue
            );
            params.delete(ENUMs.SEARCH_PARAM as string);

            if (selectedItem) {
              params.set(
                ENUMs.TABLE_NAME_PARAM as string,
                selectedItem.toString()
              );
            } else {
              params.delete(ENUMs.SEARCH_PARAM as string);
              params.delete(ENUMs.TABLE_NAME_PARAM as string);
            }
            if (selectedStartDate && selectedEndDate) {
              params.set(
                ENUMs.FROM_PARAM as string,
                parseDateToTimestamp(selectedStartDate?.toString() || "") || ""
              );
              params.set(
                ENUMs.TO_PARAM as string,
                parseDateToTimestamp(selectedEndDate?.toString() || "") || ""
              );
            } else {
              params.delete(ENUMs.FROM_PARAM as string);
              params.delete(ENUMs.TO_PARAM as string);
            }

            return params;
          });
          onClose();
        }}
        className="p-2 px-4 rounded-md text-xs bg-sky-600 text-white mt-5"
      >
        جێبەجێکردن
      </MyButton>
    </div>
  );
};

export default BackupFilter;
