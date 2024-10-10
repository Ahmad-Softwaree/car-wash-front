import Label from "../ui/Label";
import Input from "../ui/Input";
import Option from "../ui/Option";
import InputGroup from "../ui/InputGroup";
import { useState } from "react";
import MyButton from "../ui/MyButton";
import { ENUMs } from "@/lib/enum";
import { useSearchParams } from "react-router-dom";
import CustomClose from "./CustomClose";
import { useGetRolesSelection } from "@/lib/react-query/query/role.query";
import { Role } from "@/types/role";

const UserFilter = ({ onClose }: { onClose: () => void }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { data, isLoading } = useGetRolesSelection();
  const [selectedValue, setSelectedValue] = useState(
    data?.find(
      (val: Role, _index: number) =>
        val.id.toString() == searchParam.get(ENUMs.ROLE_FILTER_PARAM as string)
    )?.name || ""
  );

  return (
    <div className="mt-4">
      {data && data.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs">فلتەر بەپیێ ڕۆڵ</Label>
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
                  setSearchParam((prev: any) => {
                    const params = new URLSearchParams(prev);
                    params.delete(ENUMs.ROLE_FILTER_PARAM as string);
                    return params;
                  });
                }}
              />
            )}
          </InputGroup>
          <datalist className="w-full" id="types">
            {data.map((val: Role, _index: number) => (
              <Option className="w-full" key={val.id} value={val.name}>
                {val.name}
              </Option>
            ))}
          </datalist>
          <MyButton
            type="button"
            onClick={() => {
              setSearchParam((prev: any) => {
                const params = new URLSearchParams(prev);
                const selectedItem = data.find(
                  (val: Role) => val.name === selectedValue
                );
                if (selectedItem) {
                  // Check if selectedItem is defined
                  params.delete(ENUMs.SEARCH_PARAM as string);
                  params.set(
                    ENUMs.ROLE_FILTER_PARAM as string,
                    selectedItem.id.toString()
                  );
                } else {
                  params.delete(ENUMs.SEARCH_PARAM as string);
                  params.delete(ENUMs.ROLE_FILTER_PARAM as string);
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
      )}
    </div>
  );
};

export default UserFilter;
