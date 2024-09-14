import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import MyButton from "@/components/ui/MyButton";
import { AddCarModelInputs } from "@/types/car-model";
import {
  useAddCarModel,
  useUpdateCarModel,
} from "@/lib/react-query/query/car-model.query";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import { useGlobalContext } from "@/context/GlobalContext";

const CarModelForm = ({
  onClose,
  state,
}: FormFinalOperation & GlobalFormProps) => {
  const form = useRef<FormHandle>(null);
  const { state: globalState } = useGlobalContext();
  const { mutateAsync: add, isPending: addLoading } = useAddCarModel();
  const { mutateAsync: update, isPending: updateLoading } = useUpdateCarModel(
    globalState?.oldData?.id
  );

  let loading = addLoading || updateLoading;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCarModelInputs>({});
  const onSubmit: SubmitHandler<AddCarModelInputs> = async (data) => {
    if (state == "insert") await add(data);
    else await update(data);
    form.current?.clear();
    if (onClose) onClose();
  };
  useEffect(() => {
    if (globalState.oldData) reset(globalState.oldData);
  }, [state]);
  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-5 min-w-none "
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-bukra text-lg text-nowrap">
        فۆڕمی مۆدێلی ئۆتۆمبێڵ
      </p>
      <InputGroup error={errors.name} className="w-full text-input">
        <Input
          type="text"
          {...register("name", { required: true })}
          name="name"
          placeholder="ناو بە کوردی"
          className="w-full text-sm"
        />
      </InputGroup>

      <MyButton
        loading={loading}
        name="addUserButton"
        type="submit"
        className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-light text-sm font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default CarModelForm;
