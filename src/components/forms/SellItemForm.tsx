import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
  Id,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import { useUpdateItemInSell } from "@/lib/react-query/query/sell.query";

import InputGroup from "@/components/ui/InputGroup";
import MyButton from "../ui/MyButton";
import { UpdateSellItemInputs } from "@/types/sell";
import { useGlobalContext } from "@/context/GlobalContext";
import Label from "../ui/Label";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import { Chip, Tooltip } from "@mui/joy";
import { Minus, Plus } from "lucide-react";

const SellItemForm = ({
  onClose,
  sell_id,
}: FormFinalOperation & GlobalFormProps & { sell_id: Id }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  let sell_id_param = searchParam.get(ENUMs.SELL_PARAM as string);
  const { state: globalState } = useGlobalContext();
  const form = useRef<FormHandle>(null);
  const { mutateAsync, isPending } = useUpdateItemInSell(
    Number(sell_id_param) || sell_id,
    globalState?.oldData?.item_id
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<UpdateSellItemInputs>({});

  const onSubmit: SubmitHandler<UpdateSellItemInputs> = async (data) => {
    mutateAsync(data);
    form.current?.clear();
    if (onClose) onClose();
  };

  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none mt-2"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form"
    >
      <p className="font-bold font-bukra text-lg text-nowrap">
        چاککردنی مەواد لە وەصڵ
      </p>

      <div className="w-full flex flex-col justify-start items-start gap-5">
        <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
          <Label
            htmlFor="quantity"
            className="w-full text-sm  flex flex-row gap-2"
          >
            <p>عدد (ئەتەوێ چەند زیاد بکەی؟)</p>
          </Label>{" "}
          <div className="w-full flex flex-row justify-start items-center gap-2">
            <InputGroup
              error={errors.quantity}
              className="w-full space-y-2  text-input col-span-full md:col-span-1"
            >
              <Input
                id="quantity"
                type="text"
                {...register("quantity", { required: true })}
                name="quantity"
                placeholder="عدد"
                className="w-full text-sm"
                aria-invalid={errors.quantity ? "true" : "false"}
              />
            </InputGroup>
            <Tooltip
              placement="top"
              title="زیادکردن"
              color="success"
              variant="soft"
            >
              <Chip
                onClick={() =>
                  setValue("quantity", Number(getValues("quantity")) + 1)
                }
                variant="soft"
                color="success"
              >
                <Plus className="w-4 h-4 cursor-pointer" />
              </Chip>
            </Tooltip>

            <Tooltip
              placement="top"
              title="کەمکردن"
              color="danger"
              variant="soft"
            >
              <Chip
                onClick={() =>
                  setValue("quantity", Number(getValues("quantity")) - 1)
                }
                variant="soft"
                color="danger"
              >
                <Minus className="w-4 h-4 cursor-pointer" />
              </Chip>
            </Tooltip>
          </div>
        </div>
      </div>
      <MyButton
        loading={isPending}
        name="addUserButton"
        type="submit"
        className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2"
      >
        <p className="font-light text-sm font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default SellItemForm;
