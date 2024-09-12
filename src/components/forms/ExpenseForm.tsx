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
  useAddExpense,
  useUpdateExpense,
} from "@/lib/react-query/query/expense.query";
import InputGroup from "@/components/ui/InputGroup";
import Label from "../ui/Label";
import MyButton from "@/components/ui/MyButton";
import { AddExpenseInputs } from "@/types/expense";
import { useGlobalContext } from "@/context/GlobalContext";
import { useGetExpenseTypes } from "@/lib/react-query/query/expense-type.query";
import Loading from "../ui/Loading";
import { TailSpin } from "react-loader-spinner";
import Select from "../ui/Select";
import Option from "../ui/Option";
import { ExpenseType } from "@/types/expense-type";
const ExpenseForm = ({
  state,
  onClose,
}: FormFinalOperation & GlobalFormProps) => {
  const {
    state: { user },
  } = useAuthContext();
  const form = useRef<FormHandle>(null);
  const { state: globalState } = useGlobalContext();
  const { data: types, isLoading: typesLoading } = useGetExpenseTypes();

  const { mutateAsync, isPending } = useAddExpense();
  const { mutateAsync: updateMutate, isPending: updateLoading } =
    useUpdateExpense(globalState?.oldData?.id);

  const loading = isPending || updateLoading;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddExpenseInputs>({});
  const onSubmit: SubmitHandler<AddExpenseInputs> = async (data) => {
    let formData = {
      ...data,
      date: getCurrentDate(),
      price: Number(data.price),
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
        <p className="font-bold font-bukra text-lg text-nowrap">
          خەرجی {state == "insert" ? "نوێ" : "کۆن"}
        </p>
      </div>
      {typesLoading ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : types ? (
        <>
          <div className="w-full space-y-4">
            <InputGroup
              error={errors.expense_type_id}
              className="w-full space-y-2  text-input col-span-full md:col-span-1">
              <Select
                title="expense_type_id"
                {...register("expense_type_id", { required: true })}
                name="expense_type_id"
                id="expense_type_id"
                className="w-full">
                <Option value={-1}>جۆری خەرجی هەڵبژێرە</Option>
                {types.map((val: ExpenseType, _index: number) => (
                  <Option key={val.id} value={val.id}>
                    {val.name}
                  </Option>
                ))}
              </Select>
            </InputGroup>

            <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
              <InputGroup
                error={errors.price}
                className="w-full lg:w-[35%] text-input">
                <Input
                  type="text"
                  {...register("price", { required: true })}
                  name="price"
                  placeholder="بڕی پارەی خەرجکراو"
                  className="w-full"
                />
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
        </>
      ) : null}
      <MyButton
        loading={loading}
        name="addItemButton"
        type="submit"
        className="w-full bg-black-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-bold font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default ExpenseForm;
