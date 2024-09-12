import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import {
  useAddCustomer,
  useUpdateCustomer,
} from "@/lib/react-query/query/customer.query";

import InputGroup from "@/components/ui/InputGroup";
import MyButton from "../ui/MyButton";
import { AddCustomerInputs } from "@/types/customer";
import { useGlobalContext } from "@/context/GlobalContext";

const CustomerForm = ({
  onClose,
  state,
}: FormFinalOperation & GlobalFormProps) => {
  const { state: globalState } = useGlobalContext();
  const form = useRef<FormHandle>(null);

  const { mutateAsync, isPending } = useAddCustomer();
  const { mutateAsync: updateMutate, isPending: updatePending } =
    useUpdateCustomer(globalState?.oldData?.id);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<AddCustomerInputs>({});

  const onSubmit: SubmitHandler<AddCustomerInputs> = async (data) => {
    if (state == "insert") await mutateAsync(data);
    else await updateMutate(data);
    form.current?.clear();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (globalState.oldData) {
      let { deleted, updated_at, created_at, id, ...others } =
        globalState.oldData;
      reset(others);
    }
  }, [state, globalState]);
  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none "
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-bukra text-lg text-nowrap">
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
        </>
      </div>
      <MyButton
        loading={isPending || updatePending}
        name="addCustomerButton"
        type="submit"
        className="w-full bg-black-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-bold font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default CustomerForm;
