import { useEffect, useRef, useState } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
  ImageTypeInForm,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import {
  useAddClient,
  useUpdateClient,
} from "@/lib/react-query/query/client.query";
import Select from "../ui/Select";
import Option from "../ui/Option";
import InputGroup from "@/components/ui/InputGroup";
import Label from "../ui/Label";
import MyButton from "../ui/MyButton";
import { AddClientInputs } from "@/types/client";
import { CircleX } from "lucide-react";
import { useGlobalContext } from "@/context/GlobalContext";

import Image from "../ui/Image";
const ClientForm = ({
  onClose,
  state,
}: FormFinalOperation & GlobalFormProps) => {
  const { state: globalState } = useGlobalContext();
  const form = useRef<FormHandle>(null);

  const { mutateAsync, isPending } = useAddClient();
  const { mutateAsync: updateMutate, isPending: updatePending } =
    useUpdateClient(globalState?.oldData?.id);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<AddClientInputs & ImageTypeInForm>({});

  const onSubmit: SubmitHandler<AddClientInputs & ImageTypeInForm> = async (
    data
  ) => {
    try {
      const transformedData = {
        ...data,
      };
      if (state == "insert")
        await mutateAsync({
          ...transformedData,
        });
      else
        await updateMutate({
          old_image_name: globalState.oldData?.image_name,
          old_image_url: globalState.oldData?.image_url,
          ...transformedData,
        });
    } catch (error) {
      //nothing
    } finally {
      resetField("image");
    }
    form.current?.clear();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (globalState.oldData) {
      let {
        image_name,
        image_url,
        deleted,
        updated_at,
        created_at,
        id,
        ...others
      } = globalState.oldData;
      reset(others);
    }
  }, [state, globalState]);
  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none "
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-rabar007 text-lg text-nowrap">
        {state == "insert" ? "زیادکردنی" : "چاککردنی"} کڕیار
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
        <>
          <div className=" col-span-full md:col-span-1 w-full">
            <InputGroup
              error={errors.first_name}
              className="w-full space-y-2  text-input col-span-full md:col-span-1">
              <Input
                type="text"
                {...register("first_name", { required: true })}
                name="first_name"
                placeholder="ناوی یەکەم"
                className="w-full"
                aria-invalid={errors.first_name ? "true" : "false"}
              />
            </InputGroup>
          </div>
          <div className=" col-span-full md:col-span-1 w-full">
            <InputGroup
              error={errors.last_name}
              className="w-full space-y-2  text-input col-span-full md:col-span-1">
              <Input
                type="text"
                {...register("last_name", { required: true })}
                name="last_name"
                placeholder="ناوی دووەم"
                className="w-full"
                aria-invalid={errors.last_name ? "true" : "false"}
              />
            </InputGroup>
          </div>
          <div className=" col-span-full md:col-span-1 w-full">
            <InputGroup
              error={errors.phone}
              className="w-full space-y-2  text-input col-span-full md:col-span-1">
              <Input
                type="text"
                {...register("phone", { required: true })}
                name="phone"
                placeholder="ژمارە تەلەفۆنی یەکەم"
                className="w-full"
                aria-invalid={errors.phone ? "true" : "false"}
              />
            </InputGroup>
          </div>
          <div className=" col-span-full md:col-span-1 w-full">
            <InputGroup
              error={errors.phone1}
              className="w-full space-y-2  text-input col-span-full md:col-span-1">
              <Input
                type="text"
                {...register("phone1", { required: true })}
                name="phone1"
                placeholder="ژمارە تەلەفۆنی دووەم"
                className="w-full"
                aria-invalid={errors.phone1 ? "true" : "false"}
              />
            </InputGroup>
          </div>
          <div className=" col-span-full md:col-span-1 w-full">
            <InputGroup
              error={errors.street}
              className="w-full space-y-2  text-input col-span-full md:col-span-1">
              <Input
                type="text"
                {...register("street", { required: true })}
                name="street"
                placeholder="ناو"
                className="w-full"
                aria-invalid={errors.street ? "true" : "false"}
              />
            </InputGroup>
          </div>
        </>

        <>
          {(!watch("image") || watch("image")?.length == 0) && (
            <InputGroup error={errors.image} className="w-full space-y-2">
              <Label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor={`product_image`}>
                وێنە
              </Label>
              <Label className="flex w-[200px] cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
                <div className="space-y-1 text-center">
                  <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-500">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-600">
                    <a
                      href="#"
                      className="font-medium text-primary-500 hover:text-primary-700">
                      وێنە داگرە
                    </a>{" "}
                    یان وێنەکە لێرە دابنێ
                  </div>
                  <p className="text-sm text-gray-500 font-poppins">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
                <Input
                  className="sr-only"
                  id="product_image"
                  type="file"
                  {...register("image", {
                    required: !globalState.oldData?.image_url ? true : false,
                  })}
                  name="image"
                />
              </Label>
            </InputGroup>
          )}

          {watch("image") && watch("image")[0] && (
            <div className="w-[200px] h-[200px] relative">
              <CircleX
                className="bg-white rounded-md absolute -right-2 -top-2 z-10 text-red-500 cursor-pointer w-[30px] h-[30px]"
                onClick={() => resetField("image")}
              />
              <Image image={watch("image")[0]} />
            </div>
          )}
          {globalState.oldData?.image_url && !watch("image") && (
            <Image
              className="w-[200px] h-[200px]"
              image={globalState.oldData?.image_url}
            />
          )}
        </>
      </div>
      <MyButton
        loading={isPending || updatePending}
        name="addClientButton"
        type="submit"
        className="w-full bg-black-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-bold font-rabar007">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default ClientForm;
