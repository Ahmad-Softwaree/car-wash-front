import { useRef } from "react";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { FormFinalOperation, FormHandle } from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import { useChangePassword } from "@/lib/react-query/query/auth.query";
import InputGroup from "@/components/ui/InputGroup";
import MyButton from "@/components/ui/MyButton";
import { ChangePasswordInputs } from "@/types/auth";
const ChangePasswordForm = ({ onClose }: FormFinalOperation) => {
  const form = useRef<FormHandle>(null);
  const { mutateAsync, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputs>({});
  const onSubmit: SubmitHandler<ChangePasswordInputs> = async (data) => {
    await mutateAsync({ ...data });
    form.current?.clear();
    if (onClose) onClose();
  };

  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-5"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-bukra text-lg">گۆڕینی ووشەی نهێنی</p>
      <InputGroup className="w-full text-input" error={errors.oldPassword}>
        <Input
          type="password"
          id="oldPassword"
          placeholder="ووشەی نهێنی ئێستا"
          className="w-full"
          {...register("oldPassword", { required: true })}
        />
      </InputGroup>
      <InputGroup className="w-full text-input" error={errors.newPassword}>
        <Input
          type="password"
          id="newPassword"
          placeholder="ووشەی نهێنی نوێ"
          className="w-full"
          {...register("newPassword", { required: true })}
        />
      </InputGroup>

      <InputGroup className="w-full text-input" error={errors.reNewPassword}>
        <Input
          type="password"
          id="reNewPassword"
          placeholder="دووبارەکردنەوەی ووشەی نهێنی نوێ"
          className="w-full"
          {...register("reNewPassword", { required: true })}
        />
      </InputGroup>

      <MyButton
        loading={isPending}
        name="changePasswordButton"
        type="submit"
        className="w-full bg-black-600 rounded-sm p-3 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-bold font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default ChangePasswordForm;
