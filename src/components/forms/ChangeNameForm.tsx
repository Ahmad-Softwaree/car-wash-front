import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { FormFinalOperation, FormHandle } from "@/types/global";
import { ChangeNameInputs } from "@/types/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext } from "@/context/AuthContext";
import InputGroup from "@/components/ui/InputGroup";
import { useChangeName } from "@/lib/react-query/query/auth.query";
import MyButton from "@/components/ui/MyButton";
const ChangeNameForm = ({ onClose }: FormFinalOperation) => {
  const { mutateAsync, isPending } = useChangeName();
  const {
    state: { user },
  } = useAuthContext();
  const form = useRef<FormHandle>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeNameInputs>({});
  const onSubmit: SubmitHandler<ChangeNameInputs> = async (data) => {
    await mutateAsync({ ...data });
    form.current?.clear();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (user) reset(user);
  }, [user]);
  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-5"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-rabar007 text-lg">گۆڕینی ناو</p>
      <InputGroup error={errors.full_name} className="w-full text-input">
        <Input
          type="text"
          id="full_name"
          placeholder="ناو"
          className="w-full"
          {...register("full_name", { required: true })}
        />
      </InputGroup>

      <MyButton
        loading={isPending}
        name="changeNameButton"
        type="submit"
        className="w-full bg-black-600 rounded-sm p-3 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-bold font-rabar007">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default ChangeNameForm;
