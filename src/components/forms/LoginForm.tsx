import { useRef } from "react";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { FormHandle } from "@/types/global";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "@/lib/react-query/query/auth.query";
import InputGroup from "@/components/ui/InputGroup";
import InputAddon from "@/components/ui/InputAddon";
import MyButton from "@/components/ui/MyButton";
import Image from "../ui/Image";
import { LoginInputs } from "@/types/auth";
import { Lock, Phone, User } from "lucide-react";

const LoginForm = () => {
  const { mutateAsync, isPending } = useLogin();
  const form = useRef<FormHandle>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({});
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await mutateAsync(data);
    form.current?.clear();
  };
  return (
    <Form
      className="space-y-4 mt-5"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <InputGroup
        className="w-[300px] md:w-[400px] text-input"
        error={errors.username}>
        <InputAddon className="w-[20%] md:w-[10%]">
          <User />
        </InputAddon>
        <Input
          type="text"
          {...register("username", { required: true })}
          name="username"
          placeholder="ناوی بەکارهێنەر"
          dir="ltr"
          className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:font-rabar007 text-sm md:text-lg"
        />
      </InputGroup>
      <InputGroup
        className="w-[300px] md:w-[400px] text-input"
        error={errors.password}>
        <InputAddon className="w-[20%] md:w-[10%]">
          <Lock />
        </InputAddon>

        <Input
          {...register("password", { required: true })}
          name="password"
          type="password"
          dir="ltr"
          placeholder="ووشەی نهێنی"
          className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:font-rabar007 text-sm md:text-lg"
        />
      </InputGroup>

      <MyButton
        loading={isPending}
        name="loginButton"
        id="loginButton"
        className="w-full bg-primary-500 text-white p-3 rounded-md flex justify-center"
        type="submit">
        چوونەژوورەوە
      </MyButton>
    </Form>
  );
};

export default LoginForm;
