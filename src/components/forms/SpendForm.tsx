import { useEffect, useRef } from "react";
import Form from "@/components/ui/Form";
import { CalendarRange, CircleUserRound } from "lucide-react";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext } from "@/context/AuthContext";
import { getCurrentDate } from "@/lib/functions";
import Input from "@/components/ui/Input";
import Textarea from "../ui/Textarea";
import {
  useAddSpend,
  useUpdateSpend,
} from "@/lib/react-query/query/spend.query";
import InputGroup from "@/components/ui/InputGroup";
import Label from "../ui/Label";
import MyButton from "@/components/ui/MyButton";
import { AddSpendInputs } from "@/types/spend";
import { useGlobalContext } from "@/context/GlobalContext";
const SpendForm = ({
  state,
  onClose,
}: FormFinalOperation & GlobalFormProps) => {
  const {
    state: { user },
  } = useAuthContext();
  const form = useRef<FormHandle>(null);
  const { state: globalState } = useGlobalContext();

  const { mutateAsync, isPending } = useAddSpend();
  const { mutateAsync: updateMutate, isPending: updateLoading } =
    useUpdateSpend(globalState?.oldData?.id);

  const loading = isPending || updateLoading;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSpendInputs>({});
  const onSubmit: SubmitHandler<AddSpendInputs> = async (data) => {
    let formData = {
      ...data,
      date: getCurrentDate(),
      employee: user.id,
      amount: Number(data.amount),
    };
    if (state == "insert") await mutateAsync(formData);
    else updateMutate(formData);
    form.current?.clear();
    if (onClose) onClose();
  };
  useEffect(() => {
    if (globalState.oldData) {
      reset(globalState.oldData);
    }
  }, [state, globalState]);
  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none "
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-bold font-rabar007 text-lg text-nowrap">
          خەرجی {state == "insert" ? "نوێ" : "کۆن"}
        </p>

        <div className="flex flex-row justify-end items-center gap-5 md:gap-10 flex-wrap">
          <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
            <CircleUserRound />
            <p className="text-md  font-poppins">{user.name}</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
            <CalendarRange />
            <p className="text-md  font-poppins">{getCurrentDate()}</p>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4">
        <InputGroup error={errors.title} className="w-full text-input">
          <Input
            type="text"
            {...register("title", { required: true })}
            name="title"
            placeholder="سەردێر"
            className="w-full"
          />
        </InputGroup>

        <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
          <InputGroup
            error={errors.amount}
            className="w-full lg:w-[35%] text-input">
            <Input
              type="text"
              {...register("amount", { required: true })}
              name="amount"
              placeholder="بڕی پارەی خەرجکراو"
              className="w-full"
            />
          </InputGroup>
          <InputGroup
            error={errors.spend_by}
            className="w-full lg:w-[35%] text-input">
            <Input
              type="text"
              {...register("spend_by", { required: true })}
              name="spend_by"
              placeholder="خەرجکراوە لەلایەن"
              className="w-full"
            />
          </InputGroup>
          <InputGroup error={errors.fromCase} className="checkbox-input">
            <Input
              {...register("fromCase")}
              name="fromCase"
              type="checkbox"
              id={`fromCase`}
            />
            <Label htmlFor="fromCase">دەرکردنی پارە لە قاسە</Label>
          </InputGroup>
        </div>

        <InputGroup error={errors.note} className="checkbox-input">
          <Textarea
            {...register("note")}
            name="note"
            rows={8}
            placeholder="تێبینی"
            className="w-full text-input"
          />
        </InputGroup>
      </div>
      <MyButton
        loading={loading}
        name="addProductButton"
        type="submit"
        className="w-full bg-black-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-bold font-rabar007">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default SpendForm;
