import { useEffect, useRef, useState } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCurrentDate } from "@/lib/functions";
import Input from "@/components/ui/Input";
import Textarea from "../ui/Textarea";
import {
  useAddExpense,
  useUpdateExpense,
} from "@/lib/react-query/query/expense.query";
import InputGroup from "@/components/ui/InputGroup";
import MyButton from "@/components/ui/MyButton";
import { AddExpenseInputs } from "@/types/expense";
import { useGlobalContext } from "@/context/GlobalContext";
import { useGetExpenseTypesSelection } from "@/lib/react-query/query/expense-type.query";
import Loading from "../ui/Loading";
import { TailSpin } from "react-loader-spinner";
import Select from "../ui/Select";
import Option from "../ui/Option";
import { ExpenseType } from "@/types/expense-type";
import Label from "../ui/Label";
import { Chip } from "@mui/joy";
import { Plus } from "lucide-react";
import CustomClose from "../shared/CustomClose";
import Dialog from "../shared/Dialog";
import ExpenseTypeForm from "./ExpenseTypeForm";
const ExpenseForm = ({
  state,
  onClose,
}: FormFinalOperation & GlobalFormProps) => {
  const form = useRef<FormHandle>(null);
  const { state: globalState } = useGlobalContext();
  const { data: types, isLoading: typesLoading } =
    useGetExpenseTypesSelection();
  const [isAddType, setIsAddType] = useState<boolean>(false);

  const { mutateAsync, isPending } = useAddExpense();
  const { mutateAsync: updateMutate, isPending: updateLoading } =
    useUpdateExpense(globalState?.oldData?.id);

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
    <>
      <Form
        className="w-full flex flex-col justify-center items-start gap-10 min-w-none mt-2"
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
            <div className="w-full space-y-4 flex flex-col">
              <Label
                htmlFor="expense_type_id"
                className="w-full text-sm  flex flex-row gap-2">
                <p>جۆری خەرجی</p>
              </Label>{" "}
              <div className="w-full flex flex-row justify-start items-center gap-3">
                <InputGroup
                  error={errors.expense_type_id}
                  className="w-full space-y-2  text-input col-span-full md:col-span-1">
                  <Select
                    title="expense_type_id"
                    {...register("expense_type_id", { required: true })}
                    name="expense_type_id"
                    id="expense_type_id"
                    className="w-full dark-light text-sm">
                    <Option className="dark-light text-sm" value={-1}>
                      جۆری خەرجی هەڵبژێرە
                    </Option>
                    {types.map((val: ExpenseType, _index: number) => (
                      <Option
                        className="dark-light text-sm"
                        key={val.id}
                        value={val.id}>
                        {val.name}
                      </Option>
                    ))}
                  </Select>
                </InputGroup>
                <Chip
                  sx={{
                    borderRadius: "2px",
                  }}
                  onClick={() => setIsAddType(true)}
                  variant="soft"
                  color="success">
                  <Plus className="w-4 h-4 cursor-pointer" />
                </Chip>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2 flex-wrap">
                <Label
                  htmlFor="price"
                  className="w-full text-sm  flex flex-row gap-2">
                  <p>بڕی خەرجکراوە</p>
                </Label>{" "}
                <InputGroup
                  error={errors.price}
                  className="w-full lg:w-[35%] text-input">
                  <Input
                    type="text"
                    {...register("price", { required: true })}
                    name="price"
                    id="price"
                    placeholder="بڕی پارەی خەرجکراو"
                    className="w-full text-sm"
                  />
                </InputGroup>
              </div>
              <InputGroup
                error={errors.note}
                className="flex flex-col justify-start items-start gap-2 flex-wra">
                <Label
                  htmlFor="note"
                  className="w-full text-sm  flex flex-row gap-2">
                  <p>تێبینی</p>
                </Label>{" "}
                <Textarea
                  {...register("note")}
                  name="note"
                  id="note"
                  rows={8}
                  placeholder="تێبینی"
                  className="w-full text-input dark-light !text-sm"
                />
              </InputGroup>
            </div>
          </>
        ) : null}
        <MyButton
          loading={isPending || updateLoading}
          name="addUserButton"
          type="submit"
          className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
          <p className="font-light text-sm font-bukra">جێبەجێکردن</p>
        </MyButton>
      </Form>
      {isAddType && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={800}
          maxHeight={`90%`}
          isOpen={isAddType}
          onClose={() => setIsAddType(false)}>
          <CustomClose onClick={() => setIsAddType(false)} />
          <ExpenseTypeForm state="insert" onClose={() => setIsAddType(false)} />
        </Dialog>
      )}
    </>
  );
};

export default ExpenseForm;
