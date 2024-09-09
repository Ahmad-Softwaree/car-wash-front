import { useEffect, useRef, useState } from "react";
import Form from "@/components/ui/Form";
import {
  FormFinalOperation,
  FormHandle,
  GlobalFormProps,
  Id,
  ImageTypeInForm,
  ReactSetter,
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
import { Combobox } from "../ui/Combobox";
import { AddUserInputs } from "@/types/auth";
import { useGetEmployeesCombobox } from "@/lib/react-query/query/employee.query";
import { Employee } from "@/types/employee";
import { Part } from "@/types/part";
import { Role } from "@/types/role";
import { useGetRoles } from "@/lib/react-query/query/role.query";
import { useGetParts } from "@/lib/react-query/query/part.query";
import InputAddon from "../ui/InputAddon";
import { CircleX, Eye, EyeOff } from "lucide-react";
import { useGetRoleParts } from "@/lib/react-query/query/role-part.query";
import { useGlobalContext } from "@/context/GlobalContext";
import { useGetCities } from "@/lib/react-query/query/city.query";
import { City } from "@/types/city";
import Image from "../ui/Image";
import { UserPart } from "@/types/user-part";
import { RolePart } from "@/types/role-part";
const UserForm = ({ onClose, state }: FormFinalOperation & GlobalFormProps) => {
  const { state: globalState } = useGlobalContext();
  const form = useRef<FormHandle>(null);
  const [show, setShow] = useState<boolean>(false);
  const { data: employees, isLoading: employeesLoading } =
    useGetEmployeesCombobox();
  const [employee, setEmployee] = useState<Id>(0);

  const { data: roles, isLoading: rolesLoading } = useGetRoles();
  const { data: cities, isLoading: citiesLoading } = useGetCities();

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

  const loading = rolesLoading || partsLoading || citiesLoading;
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    getValues,
    watch,
    formState: { errors },
  } = useForm<AddUserInputs & ImageTypeInForm>({});
  const {
    data: roleParts,
    isLoading: rolePartsLoading,
    refetch: rolePartsRefetch,
  } = useGetRoleParts(watch("role_id") || -1);
  const onSubmit: SubmitHandler<AddUserInputs & ImageTypeInForm> = async (
    data
  ) => {
    try {
      const transformedData = {
        ...data,
        role_id: Number(data.role_id),
        city_id: Number(data.city_id),
      };
      if (state == "insert")
        await mutateAsync({
          employee_id: employee,
          part_ids: selectedParts,
          ...transformedData,
        });
      else
        await updateMutate({
          part_ids: selectedParts,
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
        image_name,
        image_url,
        city_name,
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
        {state == "insert" && (
          <div className=" col-span-full md:col-span-1 w-full">
            {!employeesLoading && (
              <Combobox<Employee>
                onSelect={(
                  id: Id,
                  setHolder: ReactSetter<string>,
                  one: Employee
                ) => {
                  setEmployee(id);
                  setHolder(one.first_name + " " + one.last_name);
                }}
                data={employees}
              />
            )}
          </div>
        )}
        {loading ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : roles && parts && cities ? (
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
            {state == "update" && (
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
            )}
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
            {state == "update" && (
              <div className=" col-span-full md:col-span-1 w-full">
                <InputGroup
                  error={errors.street}
                  className="w-full space-y-2  text-input col-span-full md:col-span-1">
                  <Input
                    type="text"
                    {...register("street", { required: state == "update" })}
                    name="street"
                    placeholder="ناو"
                    className="w-full"
                    aria-invalid={errors.street ? "true" : "false"}
                  />
                </InputGroup>
              </div>
            )}
            {state == "update" && (
              <div className=" col-span-full md:col-span-1 w-full">
                <InputGroup
                  error={errors.city_id}
                  className="w-full space-y-2  text-input col-span-full md:col-span-1">
                  <Select
                    title="city_id"
                    {...register("city_id", { required: state == "update" })}
                    name="city_id"
                    id="city_id"
                    className="w-full">
                    <Option value={-1}>شار هەڵبژێرە</Option>
                    {cities.map((val: City, _index: number) => (
                      <Option key={val.id} value={val.id}>
                        {val.name}
                      </Option>
                    ))}
                  </Select>
                </InputGroup>
              </div>
            )}
            {state == "insert" && (
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
            )}

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

        {state == "update" && (
          <>
            {(!watch("image") || watch("image")?.length == 0) && (
              <InputGroup error={errors.image} className="w-full space-y-2">
                <Label
                  className="mb-1 block text-sm font-medium text-gray-700"
                  htmlFor={`product_image`}>
                  وێنە
                </Label>
                <Label className="flex w-[200px] cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
                  <div className="space-y-1 text-center">
                    <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                      required: !globalState.oldData?.image_url ? true : false,
                    })}
                    name="image"
                  />
                </Label>
              </InputGroup>
            )}

            {watch("image") && watch("image")[0] && (
              <div className="w-[200px] h-[200px] relative">
                <CircleX
                  className="bg-white rounded-md absolute -right-2 -top-2 z-10 text-red-500 cursor-pointer w-[30px] h-[30px]"
                  onClick={() => resetField("image")}
                />
                <Image image={watch("image")[0]} />
              </div>
            )}
            {globalState.oldData?.image_url && !watch("image") && (
              <Image
                className="w-[200px] h-[200px]"
                image={globalState.oldData?.image_url}
              />
            )}
          </>
        )}
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
