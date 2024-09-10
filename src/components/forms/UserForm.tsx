import { useEffect, useRef, useState } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
  Id,
} from "@/types/global";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import { useAddUser, useUpdateUser } from "@/lib/react-query/query/user.query";
import Select from "../ui/Select";
import Option from "../ui/Option";
import { TailSpin } from "react-loader-spinner";
import InputGroup from "@/components/ui/InputGroup";
import Loading from "../ui/Loading";
import Label from "../ui/Label";
import MyButton from "../ui/MyButton";
import { AddUserInputs } from "@/types/auth";
import { Part } from "@/types/part";
import { Role } from "@/types/role";
import { useGetRoles } from "@/lib/react-query/query/role.query";
import { useGetParts } from "@/lib/react-query/query/part.query";
import InputAddon from "../ui/InputAddon";
import { Eye, EyeOff } from "lucide-react";
import { useGetRoleParts } from "@/lib/react-query/query/role-part.query";
import { useGlobalContext } from "@/context/GlobalContext";

import { UserPart } from "@/types/user-part";
import { RolePart } from "@/types/role-part";
const UserForm = ({ onClose, state }: FormFinalOperation & GlobalFormProps) => {
  const { state: globalState } = useGlobalContext();
  const form = useRef<FormHandle>(null);
  const [show, setShow] = useState<boolean>(false);

  const { data: roles, isLoading: rolesLoading } = useGetRoles();
  const { data: parts, isLoading: partsLoading } = useGetParts();
  const { mutateAsync, isPending } = useAddUser();
  const { mutateAsync: updateMutate, isPending: updatePending } = useUpdateUser(
    globalState?.oldData?.id
  );
  const [selectedParts, setSelectedParts] = useState<Id[] | []>([]);

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

  const loading = rolesLoading || partsLoading;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddUserInputs>({});
  const {
    data: roleParts,
    isLoading: rolePartsLoading,
    refetch: rolePartsRefetch,
  } = useGetRoleParts(watch("role_id") || -1);
  const onSubmit: SubmitHandler<AddUserInputs> = async (data) => {
    const transformedData = {
      ...data,
      role_id: Number(data.role_id),
    };
    if (state == "insert")
      await mutateAsync({
        part_ids: selectedParts,
        ...transformedData,
      });
    else
      await updateMutate({
        part_ids: selectedParts,
        ...transformedData,
      });

    form.current?.clear();
    if (onClose) onClose();
  };

  useEffect(() => {
    rolePartsRefetch();
  }, [watch("role_id")]);

  useEffect(() => {
    if (roleParts && state == "insert") {
      setSelectedParts(
        roleParts.map((val: RolePart, _index: number) => val.part_id)
      );
    }
  }, [roleParts]);

  useEffect(() => {
    if (globalState.oldData) {
      setSelectedParts(
        globalState.oldData.parts.map(
          (val: UserPart, _index: number) => val.part_id
        )
      );

      let {
        deleted,
        parts,
        password,
        role_name,
        updated_at,
        created_at,
        id,
        ...others
      } = globalState.oldData;
      reset(others);
    }
  }, [state, globalState]);
  return (
    <Form
      className="w-full flex flex-col justify-center items-start gap-10 min-w-none "
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form">
      <p className="font-bold font-rabar007 text-lg text-nowrap">
        {state == "insert" ? "زیادکردنی" : "چاککردنی"} بەکارهێنەر
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
        {loading ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : roles && parts ? (
          <>
            <div className=" col-span-full md:col-span-1 w-full">
              <InputGroup
                error={errors.role_id}
                className="w-full space-y-2  text-input col-span-full md:col-span-1">
                <Select
                  title="role_id"
                  {...register("role_id", { required: true })}
                  name="role_id"
                  id="role_id"
                  className="w-full">
                  <Option value={-1}>ڕۆڵ هەڵبژێرە</Option>
                  {roles.map((val: Role, _index: number) => (
                    <Option key={val.id} value={val.id}>
                      {val.name}
                    </Option>
                  ))}
                </Select>
              </InputGroup>
            </div>

            <div className=" col-span-full md:col-span-1 w-full">
              <InputGroup
                error={errors.name}
                className="w-full space-y-2  text-input col-span-full md:col-span-1">
                <Input
                  type="text"
                  {...register("name", { required: state == "update" })}
                  name="name"
                  placeholder="ناو"
                  className="w-full"
                  aria-invalid={errors.name ? "true" : "false"}
                />
              </InputGroup>
            </div>

            <div className=" col-span-full md:col-span-1 w-full">
              <InputGroup
                error={errors.username}
                className="w-full space-y-2  text-input col-span-full md:col-span-1">
                <Input
                  type="text"
                  {...register("username", { required: true })}
                  name="username"
                  placeholder="ناوی بەکارهێنەر"
                  className="w-full"
                  aria-invalid={errors.username ? "true" : "false"}
                />
              </InputGroup>
            </div>

            <div className=" col-span-full md:col-span-1 w-full">
              <InputGroup
                error={errors.password}
                className="w-full   text-input col-span-full md:col-span-1">
                <Input
                  type={show ? "text" : "password"}
                  {...register("password", { required: state == "insert" })}
                  name="password"
                  placeholder="ووشەی نهێنی"
                  className="w-full"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <InputAddon className="w-[20%] md:w-[10%]">
                  {!show ? (
                    <EyeOff
                      className="cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <Eye
                      className="cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  )}
                </InputAddon>
              </InputGroup>
            </div>

            <div className="spacey-y-4 w-full  col-span-full place-items-start flex flex-row justify-start items-center gap-5 flex-wrap">
              {parts.map((val: Part, _index: number) => {
                let checked = selectedParts.findIndex(
                  (ind: Id) => ind == val.id
                );
                return (
                  <InputGroup
                    key={val.id}
                    className="col-span-full md:col-span-3 lg:col-span-2 checkbox-input">
                    <Input
                      onChange={() => addPart(val.id)}
                      checked={checked != -1}
                      type="checkbox"
                      id={val.name}
                    />
                    <Label
                      className="text-md text-nowrap md:text-lg font-bold font-rabar007"
                      htmlFor={val.name}>
                      {val.name}
                    </Label>
                  </InputGroup>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      <MyButton
        loading={isPending || updatePending}
        name="addUserButton"
        type="submit"
        className="w-full bg-black-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
        <p className="font-bold font-rabar007">جێبەجێکردن</p>
      </MyButton>
    </Form>
  );
};

export default UserForm;
