import { useGetItemTypesSelection } from "@/lib/react-query/query/item-type.query";
import { ItemType } from "@/types/item-type";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Option from "../ui/Option";
import InputGroup from "../ui/InputGroup";
import { useState } from "react";
import MyButton from "../ui/MyButton";
import { ENUMs } from "@/lib/enum";
import { useSearchParams } from "react-router-dom";
import CustomClose from "./CustomClose";
import { useGetUsersSelection } from "@/lib/react-query/query/user.query";
import { User } from "@/types/auth";

const KogaReportFilter = ({ onClose }: { onClose: () => void }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { data: types } = useGetItemTypesSelection();
  const { data: users } = useGetUsersSelection();

  const [selectedValue, setSelectedValue] = useState(
    types?.find(
      (val: ItemType, _index: number) =>
        val.id.toString() == searchParam.get(ENUMs.ITEM_TYPE_PARAM as string)
    )?.name || ""
  );
  const [selectedUser, setSelectedUser] = useState(
    users?.find(
      (val: User, _index: number) =>
        val.id.toString() == searchParam.get(ENUMs.USER_FILTER_PARAM as string)
    )?.username || ""
  );

  return (
    <div className="mt-4">
      {/* USER */}
      {users && users.length > 0 && (
        <div className="space-y-2 my-2">
          <Label className="text-xs">فلتەر بەپیێ یوزەر</Label>
          <InputGroup className="text-input">
            <Input
              value={selectedUser}
              onChange={(e: any) => setSelectedUser(e.target.value)}
              placeholder="فلتەر"
              className="text-sm w-full"
              type="text"
              list="users"
            />
            {selectedUser != "" && (
              <CustomClose
                onClick={() => {
                  setSelectedUser("");
                  setSearchParam((prev: any) => {
                    const params = new URLSearchParams(prev);
                    params.delete(ENUMs.SEARCH_PARAM as string);
                    params.delete(ENUMs.USER_FILTER_PARAM as string);
                    return params;
                  });
                }}
              />
            )}
          </InputGroup>
          <datalist className="w-full" id="users">
            {users.map((val: User, _index: number) => (
              <Option className="w-full" key={val.id} value={val.username}>
                {val.username}
              </Option>
            ))}
          </datalist>
        </div>
      )}
      {types && types.length > 0 && (
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
                  setSearchParam((prev: any) => {
                    const params = new URLSearchParams(prev);
                    params.delete(ENUMs.SEARCH_PARAM as string);
                    params.delete(ENUMs.ITEM_TYPE_PARAM as string);
                    return params;
                  });
                }}
              />
            )}
          </InputGroup>
          <datalist className="w-full" id="types">
            {types.map((val: ItemType, _index: number) => (
              <Option className="w-full" key={val.id} value={val.name}>
                {val.name}
              </Option>
            ))}
          </datalist>
        </div>
      )}
      <MyButton
        type="button"
        onClick={() => {
          setSearchParam((prev: any) => {
            const params = new URLSearchParams(prev);
            params.delete(ENUMs.SEARCH_PARAM as string);

            const item = types?.find(
              (val: ItemType) => val.name === selectedValue
            );
            if (item) {
              params.set(ENUMs.ITEM_TYPE_PARAM as string, item.id.toString());
            } else {
              params.delete(ENUMs.ITEM_TYPE_PARAM as string);
            }
            const user = users?.find(
              (val: User) => val.username === selectedUser
            );
            if (user) {
              params.set(ENUMs.USER_FILTER_PARAM as string, user.id.toString());
            } else {
              params.delete(ENUMs.USER_FILTER_PARAM as string);
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

export default KogaReportFilter;
