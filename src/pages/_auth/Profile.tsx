import Container from "@/components/ui/Container";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import InputAddon from "@/components/ui/InputAddon";
import InputGroup from "@/components/ui/InputGroup";
import Label from "@/components/ui/Label";
import MyButton from "@/components/ui/MyButton";
import { useAuthContext } from "@/context/AuthContext";
import { useChangeProfile } from "@/lib/react-query/query/auth.query";
import { ChangeProfileInputs } from "@/types/auth";
import { FormHandle } from "@/types/global";
import Chip from "@mui/joy/Chip";

import Divider from "@mui/joy/Divider";
import {
  Fingerprint,
  Key,
  OctagonAlert,
  Phone,
  SquareAsterisk,
  User,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Profile = () => {
  const {
    state: { user },
  } = useAuthContext();
  const { mutateAsync, isPending } = useChangeProfile();
  const form = useRef<FormHandle>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeProfileInputs>({});
  const onSubmit: SubmitHandler<ChangeProfileInputs> = async (data) => {
    await mutateAsync(data);
    form.current?.clear();
  };

  useEffect(() => {
    if (user) {
      reset({ name: user.name });
    }
  }, [user]);
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-center ">
        <Form
          className="space-y-4 mt-5 !text-primary-800 dark:!text-white  rounded-lg border-2 border-solid border-primary-400 border-opacity-40 bg-secondary-100 dark:bg-primary-500 py-2 w-full max-w-2xl"
          ref={form}
          onSubmit={handleSubmit(onSubmit)}
          id="profileForm">
          <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
            <p className="text-sm">زانیاری کەسی</p>
            <p className="text-xs font-light opacity-50">
              لێرەدا زانیاری کەسی خۆت بگۆڕە بە ویستی خۆت
            </p>
            <div className="w-full flex flex-row justify-start items-center gap-2">
              <OctagonAlert className="text-red-600 opacity-50" />
              <p className="text-xs font-light opacity-50 text-red-600">
                تەنها ناو دەتوانی بگۆڕیت، بۆ گۆڕینی زانیاری دیکە لەڕێێ ئەدمینەوە
                دەبێت
              </p>
            </div>
          </div>
          <Divider>
            <Chip
              className="!font-bukra my-5"
              variant="soft"
              color="neutral"
              size="sm">
              زانیاری گشتی
            </Chip>
          </Divider>
          <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm">ناو</Label>
              <InputGroup className="w-full text-input" error={errors.name}>
                <InputAddon className="w-[20%] md:w-[10%]">
                  <User />
                </InputAddon>

                <Input
                  {...register("name", { required: true })}
                  name="name"
                  type="text"
                  dir="ltr"
                  placeholder="ناو"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm !text-red-600 !opacity-50 flex flex-row gap-2">
                <p> ژمارە تەلەفۆن</p>
                <OctagonAlert className="text-red-600 opacity-50" />
              </Label>
              <InputGroup className="w-full text-input !border-red-600 !opacity-50">
                <InputAddon className="w-[20%] md:w-[10%]">
                  <Phone />
                </InputAddon>

                <Input
                  value={user.phone}
                  name="name"
                  disabled
                  type="text"
                  dir="ltr"
                  placeholder="ژمارە تەلەفۆن"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
          </div>

          <Divider>
            <Chip
              className="!font-bukra my-5"
              variant="soft"
              color="neutral"
              size="sm">
              زانیاری تایبەت
            </Chip>
          </Divider>
          <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm !text-red-600 !opacity-50 flex flex-row gap-2">
                <p>ناوی بەکارهێنەر</p>
                <OctagonAlert className="text-red-600 opacity-50" />
              </Label>{" "}
              <InputGroup className="w-full text-input !border-red-600 !opacity-50">
                <InputAddon className="w-[20%] md:w-[10%]">
                  <Key />
                </InputAddon>

                <Input
                  value={user.username}
                  disabled
                  name="name"
                  type="text"
                  dir="ltr"
                  placeholder="ناوی بەکارهێنەر"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm !text-red-600 !opacity-50 flex flex-row gap-2">
                <p>ووشەی نهێنی</p>
                <OctagonAlert className="text-red-600 opacity-50" />
              </Label>{" "}
              <InputGroup className="w-full text-input !border-red-600 !opacity-50">
                <InputAddon className="w-[20%] md:w-[10%]">
                  <SquareAsterisk />
                </InputAddon>

                <Input
                  value={"*********"}
                  disabled
                  name="name"
                  type="text"
                  dir="ltr"
                  placeholder="ووشەی نهێنی"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm !text-red-600 !opacity-50 flex flex-row gap-2">
                <p>ڕۆڵ</p>
                <OctagonAlert className="text-red-600 opacity-50" />
              </Label>{" "}
              <InputGroup className="w-full text-input !border-red-600 !opacity-50">
                <InputAddon className="w-[20%] md:w-[10%]">
                  <Fingerprint />
                </InputAddon>

                <Input
                  value={user.role_name}
                  disabled
                  type="text"
                  dir="ltr"
                  placeholder="ڕۆڵ"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
          </div>

          <Divider />

          <MyButton
            type="submit"
            id="updateProfile"
            name="updateProfile"
            title="updateProfile"
            disabled={isPending}
            className="ml-auto mr-3 text-xs p-2 rounded-lg bg-sky-800 px-4 bg-opacity-50 border-2 border-solid border-primary-800 transition-all duration-200 hover:bg-opacity-100">
            دڵنیابوونەوە
          </MyButton>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
