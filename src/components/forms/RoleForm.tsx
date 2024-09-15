import { useEffect, useRef, useState } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
  Id,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import MyButton from "@/components/ui/MyButton";
import { AddRoleInputs } from "@/types/role";
import { useAddRole, useUpdateRole } from "@/lib/react-query/query/role.query";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import { useGlobalContext } from "@/context/GlobalContext";
import { useGetParts } from "@/lib/react-query/query/part.query";
import Loading from "../ui/Loading";
import { TailSpin } from "react-loader-spinner";
import NoData from "./../shared/NoData";
import { Part } from "@/types/part";
import Label from "../ui/Label";
const RoleForm = ({ onClose, state }: FormFinalOperation & GlobalFormProps) => {
  const form = useRef<FormHandle>(null);
  const { state: globalState } = useGlobalContext();
  const { mutateAsync: add, isPending: addLoading } = useAddRole();
  const { mutateAsync: update, isPending: updateLoading } = useUpdateRole(
    globalState?.oldData?.id
  );
  const [selectedParts, setSelectedParts] = useState<Id[] | []>(
    globalState?.oldData?.parts?.map((val: Part, _index: number) => val.id) ||
      []
  );
  const { data: parts, isLoading: partsLoading } = useGetParts();
  const addPart = (select: Id): void => {
    setSelectedParts((prevParts) => {
      let parts = [...prevParts];
      if (parts.includes(select)) {
        parts = parts.filter((val) => val !== select);
      } else {
        parts.push(select);
      }
      return parts;
    });
  };
  let loading = addLoading || updateLoading;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddRoleInputs>({});
  const onSubmit: SubmitHandler<AddRoleInputs> = async (data) => {
    let formData = { part_ids: selectedParts, ...data };
    if (state == "insert") await add(formData);
    else await update(formData);
    form.current?.clear();
    if (onClose) onClose();
  };
  useEffect(() => {
    if (globalState.oldData) {
      setSelectedParts(
        globalState?.oldData?.parts?.map((val: Part, _index: number) => val.id)
      );
      reset(globalState.oldData);
    }
  }, [state, globalState]);
  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-5 min-w-none mt-2"
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-bukra text-lg text-nowrap">فۆڕمی ڕۆل</p>
      <div className="col-span-full md:col-span-1 w-full flex flex-col gap-2">
        <Label htmlFor="name" className="w-full text-sm  flex flex-row gap-2">
          <p>ناو</p>
        </Label>{" "}
        <InputGroup error={errors.name} className="w-full text-input">
          <Input
            type="text"
            {...register("name", { required: true })}
            name="name"
            placeholder="ناو"
            className="w-full text-sm"
          />
        </InputGroup>
      </div>
      <p className="font-bold font-bukra text-md text-nowrap mt-5">
        چ بەشێکی بۆ کراوە بێ؟
      </p>

      <div className="w-full flex flex-row justify-start items-center gap-3 flex-wrap mb-2 dark-light">
        {partsLoading ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : parts ? (
          <>
            {parts.map((val: Part, _index: number) => {
              let checked = selectedParts.findIndex((ind: Id) => ind == val.id);
              return (
                <article
                  key={val.id}
                  onClick={() => addPart(val.id)}
                  className={`p-3 rounded-md cursor-pointer flex justify-between items-center shadow-md  px-5 w-fit text-sm ${
                    checked != -1 ? "!bg-blue-500 !text-white" : "light-dark"
                  }`}
                  id={val.id.toLocaleString()}>
                  <p className="text-sm font-bold font-bukra">{val.name}</p>
                </article>
              );
            })}
          </>
        ) : (
          <NoData>
            <p>سەرەتا بەش داغڵ بکە بۆ ئەوەی دیاری بکەیت</p>
          </NoData>
        )}
      </div>

      <MyButton
        loading={loading}
        name="addUserButton"
        type="submit"
        className=" bg-sky-600 rounded-sm p-2 px-4 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-light text-sm font-bukra">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default RoleForm;
