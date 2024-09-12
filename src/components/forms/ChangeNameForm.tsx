import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { FormFinalOperation, FormHandle } from "@/types/global";
import { ChangeProfileInputs } from "@/types/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext } from "@/context/AuthContext";
import InputGroup from "@/components/ui/InputGroup";
import { useChangeProfile } from "@/lib/react-query/query/auth.query";
import MyButton from "@/components/ui/MyButton";
const ChangeProfileForm = ({ onClose }: FormFinalOperation) => {
  const { mutateAsync, isPending } = useChangeProfile();
  const {
    state: { user },
  } = useAuthContext();
  const form = useRef<FormHandle>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeProfileInputs>({});
  const onSubmit: SubmitHandler<ChangeProfileInputs> = async (data) => {
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
      <p className="font-bold font-bukra text-lg">گۆڕینی ناو</p>
      <InputGroup error={errors.name} className="w-full text-input">
        <Input
          type="text"
          id="name"
          placeholder="ناو"
          className="w-full"
          {...register("name", { required: true })}
        />
      </InputGroup>

      <MyButton
        loading={isPending}
        name="changeNameButton"
        type="submit"
        className="w-full bg-black-600 rounded-sm p-3 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-bold font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default ChangeProfileForm;
