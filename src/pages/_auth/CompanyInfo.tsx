import Container from "@/components/ui/Container";
import Form from "@/components/ui/Form";
import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import InputAddon from "@/components/ui/InputAddon";
import InputGroup from "@/components/ui/InputGroup";
import Label from "@/components/ui/Label";
import MyButton from "@/components/ui/MyButton";
import { useToast } from "@/components/ui/use-toast";
import { firebaseStorage } from "@/lib/config/firebase.config";
import { generateNestErrors } from "@/lib/functions";
import { deleteImage } from "@/lib/react-query/actions/firebase.action";
import {
  useDeleteCompanyImage,
  useGetCompanyInfo,
  useInsertCompanyImage,
  useUpdateCompanyInfo,
} from "@/lib/react-query/query/config.query";
import { CompanyImageFrom, CompanyInfoForm } from "@/types/config";
import { FormHandle } from "@/types/global";
import Chip from "@mui/joy/Chip";

import Divider from "@mui/joy/Divider";
import { ref, StorageReference } from "firebase/storage";
import { CircleX, Info, MapPin, Phone, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const CompanyInfo = () => {
  const { toast } = useToast();

  const { data: info } = useGetCompanyInfo();
  const { mutateAsync, isPending } = useUpdateCompanyInfo();
  const { mutateAsync: imageMutate, isPending: imagePending } =
    useInsertCompanyImage();

  const form = useRef<FormHandle>(null);
  const imageForm = useRef<FormHandle>(null);
  const [imageDeleted, setImageDeleted] = useState<boolean>(false);
  const { mutateAsync: deleteImageFunc, isPending: deleteImageLoading } =
    useDeleteCompanyImage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyInfoForm>({});
  const onSubmit: SubmitHandler<CompanyInfoForm> = async (data) => {
    await mutateAsync(data);
  };

  const {
    register: imageRegister,
    handleSubmit: imageHandleSubmit,
    reset: imageReset,
    resetField,
    watch,
    formState: { errors: imageErrors },
  } = useForm<CompanyImageFrom>({});
  const onImageSubmit: SubmitHandler<CompanyImageFrom> = async (data) => {
    await imageMutate(data);
    resetField("image");
  };

  useEffect(() => {
    if (info) {
      reset(info);
    }
  }, [info]);
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-center "
      >
        <Form
          className="space-y-4 mt-5 !text-primary-800 dark:!text-white  rounded-lg border-2 border-solid border-primary-400 border-opacity-40 bg-secondary-100 dark:bg-primary-500 py-2 w-full "
          ref={form}
          onSubmit={handleSubmit(onSubmit)}
          id="profileForm"
        >
          <div className="w-full flex flex-col justify-start items-start gap-4 my-3 px-3">
            <p className="text-sm">زانیاری کۆمپانیا</p>
          </div>
          <Divider>
            <Chip
              className="!font-bukra my-5"
              variant="soft"
              color="neutral"
              size="sm"
            >
              زانیاری گشتی
            </Chip>
          </Divider>
          <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm">ناوی کۆمپانیا</Label>
              <InputGroup className="w-full text-input" error={errors.name}>
                <InputAddon className="w-[20%] md:w-[10%]">
                  <User />
                </InputAddon>

                <Input
                  {...register("name")}
                  name="name"
                  type="text"
                  dir="ltr"
                  placeholder="ناوی کۆمپانیا"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-bukra placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm flex flex-row gap-2">
                <p> ژمارە تەلەفۆنی یەکەم</p>
              </Label>
              <InputGroup className="w-full text-input">
                <InputAddon className="w-[20%] md:w-[10%]">
                  <Phone />
                </InputAddon>

                <Input
                  {...register("phone")}
                  name="phone"
                  type="text"
                  dir="ltr"
                  placeholder="ژمارە تەلەفۆنی یەکەم"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm">ژمارە تەلەفۆنی دووەم</Label>
              <InputGroup className="w-full text-input" error={errors.name}>
                <InputAddon className="w-[20%] md:w-[10%]">
                  <Phone />
                </InputAddon>

                <Input
                  {...register("phone1")}
                  name="phone1"
                  type="text"
                  dir="ltr"
                  placeholder="ژمارە تەلەفۆنی دووەم"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-poppins placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm flex flex-row gap-2">
                <p> دەربارەی کۆمپانیا</p>
              </Label>
              <InputGroup className="w-full text-input">
                <InputAddon className="w-[20%] md:w-[10%]">
                  <Info />
                </InputAddon>

                <Input
                  {...register("description")}
                  name="description"
                  type="text"
                  dir="ltr"
                  placeholder="دەربارەی کۆمپانیا"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-bukra placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap md:flex-nowrap px-3">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <Label className="w-full text-sm">ناونیشان</Label>
              <InputGroup className="w-full text-input" error={errors.name}>
                <InputAddon className="w-[20%] md:w-[10%]">
                  <MapPin />
                </InputAddon>

                <Input
                  {...register("location")}
                  name="location"
                  type="text"
                  dir="ltr"
                  placeholder="ناونیشان"
                  className="placeholder:text-right w-[80%] md:w-[90%] font-bukra placeholder:!font-bukra text-xs md:!text-sm placeholder:!text-sm"
                />
              </InputGroup>
            </div>
          </div>

          <MyButton
            type="submit"
            id="updateProfile"
            name="updateProfile"
            title="updateProfile"
            disabled={isPending}
            className="ml-auto mr-3 text-xs p-2 rounded-lg bg-sky-800 px-4 bg-opacity-50 border-2 border-solid border-primary-800 transition-all duration-200 hover:bg-opacity-100"
          >
            دڵنیابوونەوە
          </MyButton>

          <Divider />
        </Form>

        <Form
          className="space-y-4 mt-5 !text-primary-800 dark:!text-white  rounded-lg border-2 border-solid border-primary-400 border-opacity-40 bg-secondary-100 dark:bg-primary-500 py-2 w-full p-5"
          ref={imageForm}
          onSubmit={imageHandleSubmit(onImageSubmit)}
          id="imageForm"
        >
          <Divider>
            <Chip
              className="!font-bukra my-5"
              variant="soft"
              color="neutral"
              size="sm"
            >
              وێنە
            </Chip>
          </Divider>

          {!info?.image_url && (
            <InputGroup className="w-full space-y-2">
              <Label
                className="mb-1 block text-sm font-medium !dark-light w-fit"
                htmlFor={`item_image`}
              >
                وێنە
              </Label>
              <Label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
                <div className="space-y-1 text-center">
                  <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  <div className="dark-light">
                    <a href="#" className="font-medium dark-light ">
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
                  id="item_image"
                  type="file"
                  {...imageRegister("image")}
                  name="image"
                />
              </Label>
            </InputGroup>
          )}
          {watch("image") && watch("image")![0] && (
            <div className="w-full relative">
              <CircleX
                className="bg-secondary-100 rounded-md absolute -right-2 -top-2 z-10 text-red-500 cursor-pointer w-[30px] h-[30px]"
                onClick={() => {
                  resetField("image");
                }}
              />
              <Image
                className="h-[300px] w-full object-cover"
                image={watch("image")[0]}
              />
            </div>
          )}
          {info?.image_url && !imageDeleted && (
            <div className="w-full relative space-y-4">
              <Image
                className="h-[300px] w-full object-cover"
                image={info?.image_url}
              />
              <MyButton
                onClick={async () => {
                  try {
                    let imgRef: StorageReference = ref(
                      firebaseStorage,
                      info?.image_url
                    );
                    await deleteImage(imgRef, toast);
                    await deleteImageFunc();
                    setImageDeleted(true);
                  } catch (error: any) {
                    throw generateNestErrors(error, toast);
                  }
                }}
                type="button"
                className="p-2 rounded-md w-full text-white cursor-pointer border-solid border-2 border-red-500 transition-all duration-200 hover:bg-red-500"
              >
                سڕینەوەی وێنەی کۆن
              </MyButton>
            </div>
          )}
          <MyButton
            type="submit"
            id="updateImage"
            name="updateImage"
            title="updateImage"
            disabled={imagePending}
            className="ml-auto mr-3 text-xs p-2 rounded-lg bg-sky-800 px-4 bg-opacity-50 border-2 border-solid border-primary-800 transition-all duration-200 hover:bg-opacity-100"
          >
            دڵنیابوونەوە
          </MyButton>
        </Form>
      </Container>
    </>
  );
};

export default CompanyInfo;
