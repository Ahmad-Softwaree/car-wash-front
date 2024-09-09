import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { CircleFadingPlus, CircleX, PenLine } from "lucide-react";
import Textarea from "../ui/Textarea";
import { AddProductInputs } from "@/types/products";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGlobalContext } from "@/context/GlobalContext";
import InputGroup from "@/components/ui/InputGroup";
import Label from "../ui/Label";
import MyButton from "@/components/ui/MyButton";
import {
  useAddProduct,
  useUpdateProduct,
} from "@/lib/react-query/query/product.query";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
  ImageTypeInForm,
} from "@/types/global";
import Image from "../ui/Image";

const ProductForm = ({
  state = "insert",
  onClose,
}: GlobalFormProps & FormFinalOperation) => {
  const { state: globalState } = useGlobalContext();
  const form = useRef<FormHandle>(null);
  const { mutateAsync, isPending } = useAddProduct();
  const { mutateAsync: updateMutate, isPending: updatePending } =
    useUpdateProduct(globalState?.oldData?.id);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<AddProductInputs & ImageTypeInForm>({});

  const onSubmit: SubmitHandler<AddProductInputs & ImageTypeInForm> = async (
    data
  ) => {
    const transformedData = {
      ...data,
      cartoonSum: Number(data.cartoonSum),
      oneSum: Number(data.oneSum),
      cost: Number(data.cost),
      cartoonSellPrice: Number(data.cartoonSellPrice),
      oneSellPrice: Number(data.oneSellPrice),
      cartoonJumlaPrice: Number(data.cartoonJumlaPrice),
      oneJumlaPrice: Number(data.oneJumlaPrice),
      oneDollarPrice: Number(data.oneDollarPrice),
    };
    try {
      if (state == "insert") await mutateAsync(transformedData);
      else if (state == "update")
        await updateMutate({
          old_image_name: globalState.oldData?.image_name,
          old_image_url: globalState.oldData?.image_url,
          ...transformedData,
        });
    } catch (error) {
      //nothing
    } finally {
      resetField("image");
    }
    form.current?.clear();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (globalState.oldData) {
      let { image_name, image_url, ...others } = globalState.oldData;
      reset(others);
    }
  }, [state]);

  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none "
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-rabar007 text-lg">زیادکردنی مواد</p>
      <div className="w-full grid grid-cols-1 lg:grid-cols-17 gap-10 place-items-center">
        <div className="col-span-full lg:col-span-5 flex flex-col justify-center items-start gap-5 py-5 w-full">
          <InputGroup error={errors.title} className="w-full text-input">
            <Input
              type="text"
              id="title"
              placeholder="ناوی کاڵا"
              className="w-full"
              {...register("title", { required: true })}
            />
          </InputGroup>
          <InputGroup error={errors.barcode} className="w-full text-input">
            <Label htmlFor="barcode">
              <CircleFadingPlus />
            </Label>
            <Input
              type="text"
              id="barcode"
              placeholder="بارکۆد"
              className="w-full"
              {...register("barcode", { required: true })}
            />
          </InputGroup>
          <InputGroup error={errors.withoutBarcode} className="checkbox-input">
            <Input
              type="checkbox"
              id="withoutBarcode"
              {...register("withoutBarcode")}
            />
            <Label htmlFor="withoutBarcode">بێ بارکۆد</Label>
          </InputGroup>
          <InputGroup error={errors.cartoonSum} className="w-full text-input">
            <Input
              type="text"
              id="cartoonSum"
              placeholder="کۆی پاکەت"
              className="w-full"
              {...register("cartoonSum", { required: true })}
            />
          </InputGroup>
          <InputGroup error={errors.oneSum} className="w-full text-input">
            <Input
              type="text"
              id="sumOfOneCartoon"
              placeholder="کۆی دانەی ناو پاکەت"
              className="w-full"
              {...register("oneSum", { required: true })}
            />
          </InputGroup>
          <InputGroup error={errors.cost} className="w-full text-input">
            <Input
              type="text"
              id="cartoonCost"
              placeholder="بڕی تێچووی پاکەت"
              className="w-full"
              {...register("cost", { required: true })}
            />{" "}
          </InputGroup>
          <InputGroup
            error={errors.cartoonSellPrice}
            className="w-full text-input">
            <Input
              type="text"
              id="cartoonSellPrice"
              placeholder="نرخی فرۆشتن بەپاکەت"
              className="w-full"
              {...register("cartoonSellPrice", { required: true })}
            />{" "}
          </InputGroup>

          <InputGroup error={errors.oneSellPrice} className="w-full text-input">
            <Input
              type="text"
              id="oneSellPrice"
              placeholder="نرخی فرۆشتن بە دانە"
              className="w-full"
              {...register("oneSellPrice", { required: true })}
            />{" "}
          </InputGroup>
        </div>
        <div className="col-span-full lg:col-span-1 h-[2px] lg:h-full w-full lg:w-[2px] bg-gray-500 bg-opacity-50 rounded-lg "></div>

        <div className="col-span-full lg:col-span-5 flex flex-col justify-start items-start gap-5 py-5 w-full h-full">
          <InputGroup
            error={errors.cartoonJumlaPrice}
            className="w-full text-input">
            <Input
              type="text"
              id="cartoonJumlaPrice"
              placeholder="نرخی جوملە پاکەت"
              className="w-full"
              {...register("cartoonJumlaPrice", { required: true })}
            />{" "}
          </InputGroup>

          <InputGroup
            error={errors.oneJumlaPrice}
            className="w-full text-input">
            <Input
              type="text"
              id="oneJumlaPrice"
              placeholder="نرخی جوملە دانە"
              className="w-full"
              {...register("oneJumlaPrice", { required: true })}
            />{" "}
          </InputGroup>

          <InputGroup
            error={errors.oneDollarPrice}
            className="w-full text-input">
            <Input
              type="text"
              id="oneDollarPrice"
              placeholder="گۆڕینەوەی یەک دۆلار بە دینار"
              className="w-full"
              {...register("oneDollarPrice", { required: true })}
            />{" "}
          </InputGroup>

          <InputGroup error={errors.image} className="w-full space-y-2">
            <Label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor={`product_image`}>
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
                    className="h-6 w-6 text-gray-500">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                <div className="text-gray-600">
                  <a
                    href="#"
                    className="font-medium text-primary-500 hover:text-primary-700">
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
                id="product_image"
                type="file"
                {...register("image", {
                  required:
                    state == "insert"
                      ? true
                      : !globalState.oldData?.image_url
                      ? true
                      : false,
                })}
                name="image"
              />
            </Label>
          </InputGroup>
          {watch("image") && watch("image")[0] && (
            <div className="w-full relative">
              <CircleX
                className="bg-white rounded-md absolute -right-2 -top-2 z-10 text-red-500 cursor-pointer w-[30px] h-[30px]"
                onClick={() => resetField("image")}
              />
              <Image image={watch("image")[0]} />
            </div>
          )}
          {globalState.oldData?.image_url && !watch("image") && (
            <Image image={globalState.oldData?.image_url} />
          )}
        </div>
        <div className="col-span-full lg:col-span-1 h-[2px] lg:h-full w-full lg:w-[2px] bg-gray-500 bg-opacity-50 rounded-lg"></div>
        <div className="col-span-full lg:col-span-5 flex flex-col justify-start items-start gap-5 py-5 w-full h-full">
          <InputGroup error={errors.note} className="w-full text-input">
            <Textarea
              rows={20}
              id="note"
              placeholder="تێبینی (ئارەزوومەندانە)"
              className="w-full h-full"
              {...register("note", { required: true })}
            />
          </InputGroup>
        </div>
      </div>
      <MyButton
        name="addProductButton"
        type="submit"
        className={`w-full rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2 ${
          state == "insert" ? "bg-black-600" : "bg-primary-600"
        }`}
        loading={isPending || updatePending}>
        {state == "insert" ? (
          <>
            <CircleFadingPlus />
            <p className="font-bold font-rabar007">زیادکردن</p>
          </>
        ) : (
          <>
            <PenLine />
            <p className="font-bold font-rabar007">چاککردن</p>
          </>
        )}
      </MyButton>
    </Form>
  );
};

export default ProductForm;
