import { useSearchParams } from "react-router-dom";
import Label from "../ui/Label";
import DatePicker from "./DatePicker";
import MyButton from "../ui/MyButton";
import { ENUMs } from "@/lib/enum";
import { useState } from "react";
import { parseDateToTimestamp } from "@/lib/functions";
import { useGetItemTypesSelection } from "@/lib/react-query/query/item-type.query";
import { ItemType } from "@/types/item-type";
import CustomClose from "./CustomClose";
import Input from "../ui/Input";
import InputGroup from "../ui/InputGroup";
import Option from "../ui/Option";
type NullableDate = Date | null;

const ItemReportFilter = ({ onClose }: { onClose: () => void }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { data, isLoading } = useGetItemTypesSelection();
  const [selectedValue, setSelectedValue] = useState(
    data?.find(
      (val: ItemType, _index: number) =>
        val.id.toString() == searchParam.get(ENUMs.ITEM_TYPE_PARAM as string)
    )?.name || ""
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
    <div className="mt-4 space-y-6">
      {data && data.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs">فلتەر بەپیێ جۆری کاڵا</Label>
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
            {data.map((val: ItemType, _index: number) => (
              <Option className="w-full" key={val.id} value={val.name}>
                {val.name}
              </Option>
            ))}
          </datalist>
        </div>
      )}
      <div className="spacey-y-2">
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
            params.delete(ENUMs.SEARCH_PARAM as string);
            const selectedItem = data?.find(
              (val: ItemType) => val.name === selectedValue
            );
            params.delete(ENUMs.SEARCH_PARAM as string);

            if (selectedItem) {
              params.set(
                ENUMs.ITEM_TYPE_PARAM as string,
                selectedItem.toString()
              );
            } else {
              params.delete(ENUMs.SEARCH_PARAM as string);
              params.delete(ENUMs.ITEM_TYPE_PARAM as string);
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

export default ItemReportFilter;
