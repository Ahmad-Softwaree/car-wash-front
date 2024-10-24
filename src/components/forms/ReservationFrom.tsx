import React, { useEffect, useRef, useState } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import {
  useAddReservation,
  useUpdateReservation,
} from "@/lib/react-query/query/reservation.query";
import Select from "../ui/Select";
import Option from "../ui/Option";
import { TailSpin } from "react-loader-spinner";
import InputGroup from "@/components/ui/InputGroup";
import Loading from "../ui/Loading";
import Label from "../ui/Label";
import MyButton from "../ui/MyButton";
import { AddReservationInputs } from "@/types/reservation";
import { Color } from "@/types/color";
import { useGetColorsSelection } from "@/lib/react-query/query/color.query";
import { Plus } from "lucide-react";
import { useGlobalContext } from "@/context/GlobalContext";

import { Chip } from "@mui/joy";
import Dialog from "../shared/Dialog";
import CustomClose from "../shared/CustomClose";
import ColorForm from "./ColorForm";
import { useGetServicesSelection } from "@/lib/react-query/query/service.query";
import { useGetCustomersSelection } from "@/lib/react-query/query/customer.query";
import { useGetCarTypesSelection } from "@/lib/react-query/query/car-type.query";
import { useGetCarModelsSelection } from "@/lib/react-query/query/car-model.query";
import { Customer } from "@/types/customer";
import { CarModel } from "@/types/car-model";
import ServiceForm from "./ServiceForm";
import CustomerForm from "./CustomerForm";
import CarModelForm from "./CarModelForm";
import CarTypeForm from "./CarTypeForm";
import { Service } from "@/types/service";
import { CarType } from "@/types/car-type";
import Textarea from "../ui/Textarea";
import { formateDateToYMDHM } from "@/lib/functions";
import Required from "../shared/Required";
const ReservationForm = ({
  onClose,
  state,
}: FormFinalOperation & GlobalFormProps) => {
  const { state: globalState } = useGlobalContext();
  const form = useRef<FormHandle>(null);
  const [isAddColor, setIsAddColor] = useState<boolean>(false);
  const [isAddService, setIsAddService] = useState<boolean>(false);
  const [isAddCarType, setIsAddCarType] = useState<boolean>(false);
  const [isAddCarModel, setIsAddCarModel] = useState<boolean>(false);
  const [isAddCustomer, setIsAddCustomer] = useState<boolean>(false);

  const { data: colors, isLoading: colorsLoading } = useGetColorsSelection();
  const { data: services, isLoading: servicesLoading } =
    useGetServicesSelection();
  const { data: customers, isLoading: customersLoading } =
    useGetCustomersSelection();
  const { data: carTypes, isLoading: carTypesLoading } =
    useGetCarTypesSelection();
  const { data: carModels, isLoading: carModelsLoading } =
    useGetCarModelsSelection();

  const { mutateAsync, isPending } = useAddReservation();
  const { mutateAsync: updateMutate, isPending: updatePending } =
    useUpdateReservation(globalState?.oldData?.id);

  const loading =
    colorsLoading ||
    colorsLoading ||
    carTypesLoading ||
    carModelsLoading ||
    servicesLoading ||
    customersLoading;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddReservationInputs>({});

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now.getTime() - offset);
    return localTime.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (state == "insert") setValue("date_time", getCurrentDateTime());
  }, []);

  const onSubmit: SubmitHandler<AddReservationInputs> = async (data) => {
    try {
      const transformedData = {
        ...data,
        color_id:
          data.color_id && data.color_id != 0
            ? Number(data.color_id)
            : undefined,
        service_id: Number(data.service_id),
        customer_id: Number(data.customer_id),
        car_model_id:
          data.car_model_id && data.car_model_id != 0
            ? Number(data.car_model_id)
            : undefined,
        car_type_id:
          data.car_type_id && data.car_type_id != 0
            ? Number(data.car_type_id)
            : undefined,
        price: Number(data.price),
      };
      console.log(data.color_id);
      if (state == "insert")
        await mutateAsync({
          ...transformedData,
        });
      else
        await updateMutate({
          ...transformedData,
        });

      form.current?.clear();
      if (onClose) onClose();
    } catch (error) {}
  };

  useEffect(() => {
    if (globalState.oldData) {
      let {
        deleted,
        updated_at,
        created_at,
        car_type_name,
        car_model_name,
        color_name,
        customer_name,
        service_name,
        id,
        ...others
      } = globalState.oldData;
      reset(others);
      setValue("date_time", formateDateToYMDHM(others.date_time));
    }
  }, [state, globalState]);

  useEffect(() => {
    if (customers && state == "insert") {
      setValue("customer_id", customers[0].id);
    }
  }, [customers]);
  return (
    <>
      <Form
        className="w-full flex flex-col justify-center items-start gap-10 min-w-none mt-2"
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
        id="login-form"
      >
        <p className="font-bold font-bukra text-lg text-nowrap">
          {state == "insert" ? "زیادکردنی" : "چاککردنی"} سەرە
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
          {loading ? (
            <Loading>
              <TailSpin />
            </Loading>
          ) : colors && carModels && carTypes && services && customers ? (
            <>
              <div className=" col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label className="w-full text-sm  flex flex-row gap-2">
                  <p>خزمەتگوزاری</p>
                  <Required />
                </Label>{" "}
                <div className="w-full flex flex-row justify-start items-center gap-3">
                  <InputGroup
                    error={errors.service_id}
                    className="w-full space-y-2  text-input col-span-full md:col-span-1"
                  >
                    <Select
                      title="service_id"
                      {...register("service_id", { required: true })}
                      name="service_id"
                      id="service_id"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const selectedService = services.find(
                          (val: Service) => val.id == Number(e.target.value)
                        );

                        console.log(selectedService);

                        if (selectedService) {
                          setValue("price", selectedService.price || 0);
                        } else {
                          setValue("price", 0); // or handle the case when no service is found
                        }
                      }}
                      className="w-full bg-transparent !text-sm"
                    >
                      <Option className="!text-sm dark-light" value={""}>
                        خزمەتگوزاری هەڵبژێرە
                      </Option>
                      {services.map((val: Service, _index: number) => (
                        <Option
                          className="!text-sm dark-light"
                          key={val.id}
                          value={val.id}
                        >
                          {val.name}
                        </Option>
                      ))}
                    </Select>
                  </InputGroup>

                  <Chip
                    sx={{
                      borderRadius: "2px",
                    }}
                    onClick={() => setIsAddService(true)}
                    variant="soft"
                    color="success"
                  >
                    <Plus className="w-4 h-4 cursor-pointer" />
                  </Chip>
                </div>
              </div>
              <div className=" col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label className="w-full text-sm  flex flex-row gap-2">
                  <p>موشتەری</p>
                  <Required />
                </Label>{" "}
                <div className="w-full flex flex-row justify-start items-center gap-3">
                  <InputGroup
                    error={errors.customer_id}
                    className="w-full space-y-2  text-input col-span-full md:col-span-1"
                  >
                    <Select
                      title="customer_id"
                      {...register("customer_id", { required: true })}
                      name="customer_id"
                      id="customer_id"
                      className="w-full bg-transparent !text-sm"
                    >
                      <Option className="!text-sm dark-light" value={""}>
                        موشتەری هەڵبژێرە
                      </Option>
                      {customers.map((val: Customer, _index: number) => (
                        <Option
                          className="!text-sm dark-light"
                          key={val.id}
                          value={val.id}
                        >
                          {val.name}
                        </Option>
                      ))}
                    </Select>
                  </InputGroup>

                  <Chip
                    sx={{
                      borderRadius: "2px",
                    }}
                    onClick={() => setIsAddCustomer(true)}
                    variant="soft"
                    color="success"
                  >
                    <Plus className="w-4 h-4 cursor-pointer" />
                  </Chip>
                </div>
              </div>
              <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label className="w-full text-sm  flex flex-row gap-2">
                  <p>نرخ</p>
                  <Required />
                </Label>{" "}
                <InputGroup
                  error={errors.price}
                  className="w-full space-y-2  text-input col-span-full md:col-span-1"
                >
                  <Input
                    type="text"
                    {...register("price", { required: true })}
                    name="price"
                    placeholder="نرخ"
                    className="w-full text-sm"
                    aria-invalid={errors.price ? "true" : "false"}
                  />
                </InputGroup>
              </div>

              <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label
                  htmlFor="time"
                  className="w-full text-sm  flex flex-row gap-2"
                >
                  <p>بەروار و کات</p>
                  <Required />
                </Label>{" "}
                <InputGroup
                  error={errors.date_time}
                  className="w-full space-y-2  text-input col-span-full md:col-span-1"
                >
                  <Input
                    id="time"
                    type="datetime-local"
                    {...register("date_time", { required: true })}
                    name="date_time"
                    placeholder="بەروار و کات"
                    className="w-full text-sm"
                    aria-invalid={errors.date_time ? "true" : "false"}
                  />
                </InputGroup>
              </div>
              <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label className="w-full text-sm  flex flex-row gap-2">
                  <p>ژ.ئۆتۆمبێل</p>
                </Label>{" "}
                <InputGroup
                  error={errors.car_number}
                  className="w-full space-y-2  text-input col-span-full md:col-span-1"
                >
                  <Input
                    type="text"
                    {...register("car_number")}
                    name="car_number"
                    placeholder="ژ.ئۆتۆمبێل"
                    className="w-full text-sm"
                    aria-invalid={errors.car_number ? "true" : "false"}
                  />
                </InputGroup>
              </div>
              <div className=" col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label className="w-full text-sm  flex flex-row gap-2">
                  <p>جۆری ئۆتۆمبێل</p>
                </Label>{" "}
                <div className="w-full flex flex-row justify-start items-center gap-3">
                  <InputGroup
                    error={errors.car_type_id}
                    className="w-full space-y-2  text-input col-span-full md:col-span-1"
                  >
                    <Select
                      title="car_type_id"
                      {...register("car_type_id")}
                      name="car_type_id"
                      id="car_type_id"
                      className="w-full bg-transparent !text-sm"
                    >
                      <Option className="!text-sm dark-light" value={""}>
                        جۆری ئۆتۆمبێل هەڵبژێرە
                      </Option>
                      {carTypes.map((val: CarType, _index: number) => (
                        <Option
                          className="!text-sm dark-light"
                          key={val.id}
                          value={val.id}
                        >
                          {val.name}
                        </Option>
                      ))}
                    </Select>
                  </InputGroup>

                  <Chip
                    sx={{
                      borderRadius: "2px",
                    }}
                    onClick={() => setIsAddCarType(true)}
                    variant="soft"
                    color="success"
                  >
                    <Plus className="w-4 h-4 cursor-pointer" />
                  </Chip>
                </div>
              </div>

              <div className=" col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label className="w-full text-sm  flex flex-row gap-2">
                  <p>مۆدێلی ئۆتۆمبێل</p>
                </Label>{" "}
                <div className="w-full flex flex-row justify-start items-center gap-3">
                  <InputGroup
                    error={errors.car_model_id}
                    className="w-full space-y-2  text-input col-span-full md:col-span-1"
                  >
                    <Select
                      title="car_model_id"
                      {...register("car_model_id")}
                      name="car_model_id"
                      id="car_model_id"
                      className="w-full bg-transparent !text-sm"
                    >
                      <Option className="!text-sm dark-light" value={""}>
                        مۆدێلی ئۆتۆمبێل هەڵبژێرە
                      </Option>
                      {carModels.map((val: CarModel, _index: number) => (
                        <Option
                          className="!text-sm dark-light"
                          key={val.id}
                          value={val.id}
                        >
                          {val.name}
                        </Option>
                      ))}
                    </Select>
                  </InputGroup>

                  <Chip
                    sx={{
                      borderRadius: "2px",
                    }}
                    onClick={() => setIsAddCarModel(true)}
                    variant="soft"
                    color="success"
                  >
                    <Plus className="w-4 h-4 cursor-pointer" />
                  </Chip>
                </div>
              </div>
              <div className=" col-span-full md:col-span-1 w-full flex flex-col gap-2">
                <Label className="w-full text-sm  flex flex-row gap-2">
                  <p>ڕەنگ</p>
                </Label>{" "}
                <div className="w-full flex flex-row justify-start items-center gap-3">
                  <InputGroup
                    error={errors.color_id}
                    className="w-full space-y-2  text-input col-span-full md:col-span-1"
                  >
                    <Select
                      title="color_id"
                      {...register("color_id")}
                      name="color_id"
                      id="color_id"
                      className="w-full bg-transparent !text-sm"
                    >
                      <Option className="!text-sm dark-light" value={""}>
                        ڕەنگ هەڵبژێرە
                      </Option>
                      {colors.map((val: Color, _index: number) => (
                        <Option
                          className="!text-sm dark-light"
                          key={val.id}
                          value={val.id}
                        >
                          {val.name}
                        </Option>
                      ))}
                    </Select>
                  </InputGroup>

                  <Chip
                    sx={{
                      borderRadius: "2px",
                    }}
                    onClick={() => setIsAddColor(true)}
                    variant="soft"
                    color="success"
                  >
                    <Plus className="w-4 h-4 cursor-pointer" />
                  </Chip>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start gap-2  w-full h-full">
                <Label
                  htmlFor="note"
                  className="w-full text-sm  flex flex-row gap-2"
                >
                  <p>تێبینی</p>
                </Label>{" "}
                <InputGroup error={errors.note} className="w-full text-input">
                  <Textarea
                    rows={12}
                    id="note"
                    placeholder="تێبینی (ئارەزوومەندانە)"
                    className="w-full h-full text-sm !bg-transparent"
                    {...register("note")}
                  />
                </InputGroup>
              </div>
            </>
          ) : null}
        </div>
        <MyButton
          loading={isPending || updatePending}
          name="addReservationButton"
          type="submit"
          className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2"
        >
          <p className="font-light text-sm font-bukra">جێبەجێکردن</p>
        </MyButton>
      </Form>
      {isAddColor && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isAddColor}
          onClose={() => setIsAddColor(false)}
        >
          <CustomClose onClick={() => setIsAddColor(false)} />
          <ColorForm state="insert" onClose={() => setIsAddColor(false)} />
        </Dialog>
      )}

      {isAddService && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isAddService}
          onClose={() => setIsAddService(false)}
        >
          <CustomClose onClick={() => setIsAddService(false)} />
          <ServiceForm state="insert" onClose={() => setIsAddService(false)} />
        </Dialog>
      )}

      {isAddCustomer && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isAddCustomer}
          onClose={() => setIsAddCustomer(false)}
        >
          <CustomClose onClick={() => setIsAddCustomer(false)} />
          <CustomerForm
            state="insert"
            onClose={() => setIsAddCustomer(false)}
          />
        </Dialog>
      )}

      {isAddCarModel && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isAddCarModel}
          onClose={() => setIsAddCarModel(false)}
        >
          <CustomClose onClick={() => setIsAddCarModel(false)} />
          <CarModelForm
            state="insert"
            onClose={() => setIsAddCarModel(false)}
          />
        </Dialog>
      )}

      {isAddCarType && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isAddCarType}
          onClose={() => setIsAddCarType(false)}
        >
          <CustomClose onClick={() => setIsAddCarType(false)} />
          <CarTypeForm state="insert" onClose={() => setIsAddCarType(false)} />
        </Dialog>
      )}
    </>
  );
};

export default ReservationForm;
