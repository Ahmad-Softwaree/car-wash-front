import Label from "../ui/Label";
import Input from "../ui/Input";
import Option from "../ui/Option";
import InputGroup from "../ui/InputGroup";
import { useState } from "react";
import MyButton from "../ui/MyButton";
import { ENUMs } from "@/lib/enum";
import { useSearchParams } from "react-router-dom";
import CustomClose from "./CustomClose";
import { useGetColorsSelection } from "@/lib/react-query/query/color.query";
import { Color } from "@/types/color";
import { useGetServicesSelection } from "@/lib/react-query/query/service.query";
import { useGetCarModelsSelection } from "@/lib/react-query/query/car-model.query";
import { useGetCarTypesSelection } from "@/lib/react-query/query/car-type.query";
import { Service } from "@/types/service";
import { CarModel } from "@/types/car-model";
import { CarType } from "@/types/car-type";
import { useGetUsersSelection } from "@/lib/react-query/query/user.query";
import { User } from "@/types/auth";
import DatePicker from "./DatePicker";
import { parseDateToTimestamp } from "@/lib/functions";
type NullableDate = Date | null;

const ReservationReportFilter = ({ onClose }: { onClose: () => void }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { data: colors } = useGetColorsSelection();
  const { data: services } = useGetServicesSelection();
  const { data: carModels } = useGetCarModelsSelection();
  const { data: carTypes } = useGetCarTypesSelection();
  const { data: users } = useGetUsersSelection();

  const [selectedColor, setSelectedColor] = useState(
    colors?.find(
      (val: Color, _index: number) =>
        val.id.toString() == searchParam.get(ENUMs.COLOR_FILTER_PARAM as string)
    )?.name || ""
  );

  const [selectedService, setSelectedService] = useState(
    services?.find(
      (val: Service, _index: number) =>
        val.id.toString() ==
        searchParam.get(ENUMs.SERVICE_FILTER_PARAM as string)
    )?.name || ""
  );

  const [selectedCarModel, setSelectedCarModel] = useState(
    carModels?.find(
      (val: CarModel, _index: number) =>
        val.id.toString() ==
        searchParam.get(ENUMs.CAR_MODEL_FILTER_PARAM as string)
    )?.name || ""
  );

  const [selectedCarType, setSelectedCarType] = useState(
    carTypes?.find(
      (val: CarType, _index: number) =>
        val.id.toString() ==
        searchParam.get(ENUMs.CAR_TYPE_FILTER_PARAM as string)
    )?.name || ""
  );
  const [selectedUser, setSelectedUser] = useState(
    users?.find(
      (val: User, _index: number) =>
        val.id.toString() == searchParam.get(ENUMs.USER_FILTER_PARAM as string)
    )?.username || ""
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
    <div className="mt-4">
      <Label className="text-xs">فلتەر بەپێی بەروار</Label>

      <DatePicker
        selectedEndDate={selectedEndDate}
        selectedStartDate={selectedStartDate}
        setSelectedEndDate={setSelectedEndDate}
        setSelectedStartDate={setSelectedStartDate}
      />

      <>
        {/* CAR MODEL */}
        {carModels && carModels.length > 0 && (
          <div className="space-y-2 mt-2">
            <Label className="text-xs">فلتەر بەپیێ مۆدێلی ئۆتۆمبێل</Label>
            <InputGroup className="text-input">
              <Input
                value={selectedCarModel}
                onChange={(e: any) => setSelectedCarModel(e.target.value)}
                placeholder="فلتەر"
                className="text-sm w-full"
                type="text"
                list="carModels"
              />
              {selectedCarModel != "" && (
                <CustomClose
                  onClick={() => {
                    setSelectedCarModel("");
                    setSearchParam((prev: any) => {
                      const params = new URLSearchParams(prev);
                      params.delete(ENUMs.SEARCH_PARAM as string);
                      params.delete(ENUMs.CAR_MODEL_FILTER_PARAM as string);
                      return params;
                    });
                  }}
                />
              )}
            </InputGroup>
            <datalist className="w-full" id="carModels">
              {carModels.map((val: CarModel, _index: number) => (
                <Option className="w-full" key={val.id} value={val.name}>
                  {val.name}
                </Option>
              ))}
            </datalist>
          </div>
        )}

        {/* CAR TYPE */}
        {carTypes && carTypes.length > 0 && (
          <div className="space-y-2 mt-2">
            <Label className="text-xs">فلتەر بەپیێ جۆری ئۆتۆمبێل</Label>
            <InputGroup className="text-input">
              <Input
                value={selectedCarType}
                onChange={(e: any) => setSelectedCarType(e.target.value)}
                placeholder="فلتەر"
                className="text-sm w-full"
                type="text"
                list="carTypes"
              />
              {selectedCarType != "" && (
                <CustomClose
                  onClick={() => {
                    setSelectedCarType("");
                    setSearchParam((prev: any) => {
                      const params = new URLSearchParams(prev);
                      params.delete(ENUMs.SEARCH_PARAM as string);
                      params.delete(ENUMs.CAR_TYPE_FILTER_PARAM as string);
                      return params;
                    });
                  }}
                />
              )}
            </InputGroup>
            <datalist className="w-full" id="carTypes">
              {carTypes.map((val: CarType, _index: number) => (
                <Option className="w-full" key={val.id} value={val.name}>
                  {val.name}
                </Option>
              ))}
            </datalist>
          </div>
        )}

        {/* SERVICE */}
        {services && services.length > 0 && (
          <div className="space-y-2 mt-2">
            <Label className="text-xs">فلتەر بەپیێ خزمەتگوزاری</Label>
            <InputGroup className="text-input">
              <Input
                value={selectedService}
                onChange={(e: any) => setSelectedService(e.target.value)}
                placeholder="فلتەر"
                className="text-sm w-full"
                type="text"
                list="services"
              />
              {selectedService != "" && (
                <CustomClose
                  onClick={() => {
                    setSelectedService("");
                    setSearchParam((prev: any) => {
                      const params = new URLSearchParams(prev);
                      params.delete(ENUMs.SEARCH_PARAM as string);
                      params.delete(ENUMs.SERVICE_FILTER_PARAM as string);
                      return params;
                    });
                  }}
                />
              )}
            </InputGroup>
            <datalist className="w-full" id="services">
              {services.map((val: Service, _index: number) => (
                <Option className="w-full" key={val.id} value={val.name}>
                  {val.name}
                </Option>
              ))}
            </datalist>
          </div>
        )}

        {/* COLOR */}
        {colors && colors.length > 0 && (
          <div className="space-y-2 mt-2">
            <Label className="text-xs">فلتەر بەپیێ ڕەنگ</Label>
            <InputGroup className="text-input">
              <Input
                value={selectedColor}
                onChange={(e: any) => setSelectedColor(e.target.value)}
                placeholder="فلتەر"
                className="text-sm w-full"
                type="text"
                list="colors"
              />
              {selectedColor != "" && (
                <CustomClose
                  onClick={() => {
                    setSelectedColor("");
                    setSearchParam((prev: any) => {
                      const params = new URLSearchParams(prev);
                      params.delete(ENUMs.SEARCH_PARAM as string);
                      params.delete(ENUMs.COLOR_FILTER_PARAM as string);
                      return params;
                    });
                  }}
                />
              )}
            </InputGroup>
            <datalist className="w-full" id="colors">
              {colors.map((val: Color, _index: number) => (
                <Option className="w-full" key={val.id} value={val.name}>
                  {val.name}
                </Option>
              ))}
            </datalist>
          </div>
        )}

        {/* USER */}
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

              if (!selectedStartDate || !selectedEndDate) {
                params.delete(ENUMs.FROM_PARAM as string);
                params.delete(ENUMs.TO_PARAM as string);
              } else {
                params.delete(ENUMs.SEARCH_PARAM as string);
                params.set(
                  ENUMs.FROM_PARAM as string,
                  parseDateToTimestamp(selectedStartDate?.toString() || "") ||
                    ""
                );
                params.set(
                  ENUMs.TO_PARAM as string,
                  parseDateToTimestamp(selectedEndDate?.toString() || "") || ""
                );
              }

              //CAR_MODEL
              const carModel = carModels?.find(
                (val: CarModel) => val.name === selectedCarModel
              );
              if (carModel) {
                params.set(
                  ENUMs.CAR_MODEL_FILTER_PARAM as string,
                  carModel.id.toString()
                );
              } else {
                params.delete(ENUMs.CAR_MODEL_FILTER_PARAM as string);
              }

              //CAR_TYPE

              const carType = carTypes?.find(
                (val: CarType) => val.name === selectedCarType
              );

              if (carType) {
                params.set(
                  ENUMs.CAR_TYPE_FILTER_PARAM as string,
                  carType.id.toString()
                );
              } else {
                params.delete(ENUMs.CAR_TYPE_FILTER_PARAM as string);
              }

              //SERVICE
              const service = services?.find(
                (val: Service) => val.name === selectedService
              );
              if (service) {
                params.set(
                  ENUMs.SERVICE_FILTER_PARAM as string,
                  service.id.toString()
                );
              } else {
                params.delete(ENUMs.SERVICE_FILTER_PARAM as string);
              }

              // COLOR
              const color = colors?.find(
                (val: Color) => val.name === selectedColor
              );

              if (color) {
                params.set(
                  ENUMs.COLOR_FILTER_PARAM as string,
                  color.id.toString()
                );
              } else {
                params.delete(ENUMs.COLOR_FILTER_PARAM as string);
              }

              // USER
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

export default ReservationReportFilter;
