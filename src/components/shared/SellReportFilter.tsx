import { useSearchParams } from "react-router-dom";
import Label from "../ui/Label";
import DatePicker from "./DatePicker";
import MyButton from "../ui/MyButton";
import { ENUMs } from "@/lib/enum";
import { useState } from "react";
import { parseDateToTimestamp } from "@/lib/functions";
import { useGetUsersSelection } from "@/lib/react-query/query/user.query";
import { User } from "@/types/auth";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import CustomClose from "./CustomClose";
import Option from "../ui/Option";

type NullableDate = Date | null;

const SellReportFilter = ({ onClose }: { onClose: () => void }) => {
  const { data: users } = useGetUsersSelection();

  const [searchParam, setSearchParam] = useSearchParams();
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
  const [selectedUser, setSelectedUser] = useState(
    users?.find(
      (val: User, _index: number) =>
        val.id.toString() == searchParam.get(ENUMs.USER_FILTER_PARAM as string)
    )?.username || ""
  );

  return (
    <div className="mt-4 space-y-6">
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
      <div className="my-2 space-y-2">
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

            if (!selectedStartDate || !selectedEndDate) {
              params.delete(ENUMs.FROM_PARAM as string);
              params.delete(ENUMs.TO_PARAM as string);
            } else {
              params.set(
                ENUMs.FROM_PARAM as string,
                parseDateToTimestamp(selectedStartDate?.toString() || "") || ""
              );
              params.set(
                ENUMs.TO_PARAM as string,
                parseDateToTimestamp(selectedEndDate?.toString() || "") || ""
              );
            }

            // USER
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

export default SellReportFilter;
