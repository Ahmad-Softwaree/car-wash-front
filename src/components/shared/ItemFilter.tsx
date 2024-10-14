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

const ItemFilter = ({ onClose }: { onClose: () => void }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { data: types } = useGetItemTypesSelection();
  const { data: users } = useGetUsersSelection();

  const [selectedType, setSelectedType] = useState(
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
      <>
        {types && types.length > 0 && (
          <div className="space-y-2 mt-2">
            <Label className="text-xs">فلتەر بەپیێ جۆری کاڵا</Label>
            <InputGroup className="text-input">
              <Input
                value={selectedType}
                onChange={(e: any) => setSelectedType(e.target.value)}
                placeholder="فلتەر"
                className="text-sm w-full"
                type="text"
                list="types"
              />
              {selectedType != "" && (
                <CustomClose
                  onClick={() => {
                    setSelectedType("");
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
        {users && users.length > 0 && (
          <div className="space-y-2 mt-2">
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
        <MyButton
          type="button"
          onClick={() => {
            setSearchParam((prev: any) => {
              const params = new URLSearchParams(prev);
              params.delete(ENUMs.SEARCH_PARAM as string);

              const type = types?.find(
                (val: ItemType) => val.name === selectedType
              );
              if (type) {
                params.set(ENUMs.ITEM_TYPE_PARAM as string, type.id.toString());
              } else {
                params.delete(ENUMs.ITEM_TYPE_PARAM as string);
              }

              const user = users?.find(
                (val: User) => val.username === selectedUser
              );
              if (user) {
                params.set(
                  ENUMs.USER_FILTER_PARAM as string,
                  user.id.toString()
                );
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
      </>
    </div>
  );
};

export default ItemFilter;
