import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import MyButton from "@/components/ui/MyButton";
import { AddServiceInputs } from "@/types/service";
import {
  useAddService,
  useUpdateService,
} from "@/lib/react-query/query/service.query";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import { useGlobalContext } from "@/context/GlobalContext";
import Label from "../ui/Label";
import Required from "../shared/Required";

const ServiceForm = ({
  onClose,
  state,
}: FormFinalOperation & GlobalFormProps) => {
  const form = useRef<FormHandle>(null);
  const { state: globalState } = useGlobalContext();
  const { mutateAsync: add, isPending: addLoading } = useAddService();
  const { mutateAsync: update, isPending: updateLoading } = useUpdateService(
    globalState?.oldData?.id
  );

  let loading = addLoading || updateLoading;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddServiceInputs>({});
  const onSubmit: SubmitHandler<AddServiceInputs> = async (data) => {
    try {
      let formData = { ...data, price: Number(data.price) };
      if (state == "insert") await add(formData);
      else await update(formData);
      form.current?.clear();
      if (onClose) onClose();
    } catch (error) {}
  };
  useEffect(() => {
    if (globalState.oldData) reset(globalState.oldData);
  }, [state]);
  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-5 min-w-none mt-2"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form"
    >
      <p className="font-bold font-bukra text-lg text-nowrap">
        فۆڕمی خزمەتگوزاری
      </p>
      <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
        <Label htmlFor="name" className="w-full text-sm  flex flex-row gap-2">
          <p>ناو</p>
          <Required />
        </Label>{" "}
        <InputGroup error={errors.name} className="w-full text-input">
          <Input
            type="text"
            {...register("name", { required: true })}
            name="name"
            placeholder="ناو"
            className="w-full text-sm"
          />
        </InputGroup>
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

      <MyButton
        loading={loading}
        name="addUserButton"
        type="submit"
        className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2"
      >
        <p className="font-light text-sm font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default ServiceForm;
