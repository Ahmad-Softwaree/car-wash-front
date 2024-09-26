import { useRef } from "react";
import Form from "@/components/ui/Form";
import { FormHandle } from "@/types/global";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "@/lib/react-query/query/auth.query";
import InputGroup from "@/components/ui/InputGroup";
import InputAddon from "@/components/ui/InputAddon";
import MyButton from "@/components/ui/MyButton";
import { LoginInputs } from "@/types/auth";
import { Lock, User } from "lucide-react";
import Input from "../ui/Input";

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
      className="space-y-4 mt-5 !text-primary-800 dark:!text-white w-full"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <InputGroup className="w-full text-input" error={errors.username}>
        <InputAddon className="w-[20%] md:w-[10%]">
          <User />
        </InputAddon>

        <Input
          {...register("username", { required: true })}
          name="username"
          type="text"
          dir="ltr"
          placeholder="ناوی بەکارهێنەر"
          className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-sm md:text-md"
        />
      </InputGroup>
      <InputGroup className="w-full text-input" error={errors.password}>
        <InputAddon className="w-[20%] md:w-[10%]">
          <Lock />
        </InputAddon>

        <Input
          {...register("password", { required: true })}
          name="password"
          type="password"
          dir="ltr"
          placeholder="ووشەی نهێنی"
          className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-sm md:text-md"
        />
      </InputGroup>

      <MyButton
        loading={isPending}
        name="loginButton"
        id="loginButton"
        className="w-full text-sm bg-sky-800 text-white p-3 rounded-md flex justify-center"
        type="submit">
        چوونەژوورەوە
      </MyButton>
    </Form>
  );
};

export default LoginForm;
