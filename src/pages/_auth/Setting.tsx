import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";

import Loading from "@/components/ui/Loading";

import { TailSpin } from "react-loader-spinner";
import { useGetRoles } from "@/lib/react-query/query/role.query";
import { useGetParts } from "@/lib/react-query/query/part.query";
import { Role } from "@/types/role";
import { Part } from "@/types/part";
import RoleCard from "@/components/cards/RoleCard";
import PartCard from "@/components/cards/PartCard";
import MyButton from "@/components/ui/MyButton";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import Dialog from "@/components/shared/Dialog";
import RoleForm from "@/components/forms/RoleForm";

import { useGetCarModels } from "@/lib/react-query/query/car-model.query";
import { useGetCarTypes } from "@/lib/react-query/query/car-type.query";
import { useGetColors } from "@/lib/react-query/query/color.query";
import { useGetServices } from "@/lib/react-query/query/service.query";
import { useGetExpenseTypes } from "@/lib/react-query/query/expense-type.query";
import CarModelCard from "@/components/cards/CarModelCard";
import CarTypeCard from "@/components/cards/CarTypeCard";
import ColorCard from "@/components/cards/ColorCard";
import ExpenseTypeCard from "@/components/cards/ExpenseTypeCard";
import ServiceCard from "@/components/cards/ServiceCard";
import CarModelForm from "@/components/forms/CarModelForm";
import CarTypeForm from "@/components/forms/CarTypeForm";
import ColorForm from "@/components/forms/ColorForm";
import ServiceForm from "@/components/forms/ServiceForm";
import ExpenseTypeForm from "@/components/forms/ExpenseTypeForm";

const Setting = () => {
  const { data: roles, isLoading: rolesLoading } = useGetRoles();
  const { data: parts, isLoading: partsLoading } = useGetParts();

  const { data: carModels, isLoading: carModelsLoading } = useGetCarModels();
  const { data: carTypes, isLoading: carTypesLoading } = useGetCarTypes();
  const { data: colors, isLoading: colorsLoading } = useGetColors();
  const { data: services, isLoading: servicesLoading } = useGetServices();
  const { data: expenseTypes, isLoading: expenseTypesLoading } =
    useGetExpenseTypes();

  const [isAddRole, setIsAddRole] = useState<boolean>(false);
  const [isAddCarModel, setIsAddCarModel] = useState<boolean>(false);
  const [isAddCarType, setIsAddCarType] = useState<boolean>(false);
  const [isAddColor, setIsAddColor] = useState<boolean>(false);
  const [isAddService, setIsAddService] = useState<boolean>(false);
  const [isAddExpenseType, setIsAddExpenseType] = useState<boolean>(false);

  const loading =
    rolesLoading &&
    partsLoading &&
    carModelsLoading &&
    carTypesLoading &&
    colorsLoading &&
    servicesLoading &&
    expenseTypesLoading;
  return (
    <>
      <Container
        as={`div`}
        className="w-full space-y-15 flex flex-col justify-start items-start ">
        <Return>ڕێکخستن</Return>
        {loading ? (
          <Loading>
            <TailSpin />
          </Loading>
        ) : roles &&
          parts &&
          carTypes &&
          carModels &&
          colors &&
          services &&
          expenseTypes ? (
          <>
            <div className="space-y-5">
              <h2 className="space-y-5  text-md md:text-lg font-bukra font-bold">
                ڕۆڵەکان
              </h2>

              <MyButton
                onClick={() => setIsAddRole(true)}
                type="button"
                name="addRoleForm"
                id="addRoleForm"
                className="mr-2 p-2 px-4 rounded-md bg-primary-500 flex flex-row justify-center items-center gap-3 text-white">
                <p>زیادکردنی ڕۆڵ</p>
                <BadgePlus />
              </MyButton>
              <div className="w-full flex flex-row justify-start items-start gap-10 flex-wrap">
                {roles.map((val: Role, _index: number) => (
                  <RoleCard key={val.id} {...val} />
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="space-y-5  text-md md:text-lg font-bukra font-bold">
                مۆدێلەکانی ئۆتۆمبێل
              </h2>
              <MyButton
                onClick={() => setIsAddCarModel(true)}
                type="button"
                name="addCarModelForm"
                id="addCarModelForm"
                className="mr-2 p-2 px-4 rounded-md bg-primary-500 flex flex-row justify-center items-center gap-3 text-white">
                <p>زیادکردنی مۆدێلی ئۆتۆمبێل</p>
                <BadgePlus />
              </MyButton>
              <div className="w-full flex flex-row justify-start items-start gap-10 flex-wrap">
                {carModels.map((val: Part, _index: number) => (
                  <CarModelCard key={val.id} {...val} />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h2 className="space-y-5  text-md md:text-lg font-bukra font-bold">
                جۆرەکانی ئۆتۆمبێل
              </h2>
              <MyButton
                onClick={() => setIsAddCarType(true)}
                type="button"
                name="addCarTypeForm"
                id="addCarTypeForm"
                className="mr-2 p-2 px-4 rounded-md bg-primary-500 flex flex-row justify-center items-center gap-3 text-white">
                <p>زیادکردنی جۆری ئۆتۆمبێل</p>
                <BadgePlus />
              </MyButton>
              <div className="w-full flex flex-row justify-start items-start gap-10 flex-wrap">
                {carTypes.map((val: Part, _index: number) => (
                  <CarTypeCard key={val.id} {...val} />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h2 className="space-y-5  text-md md:text-lg font-bukra font-bold">
                ڕەنگەکان
              </h2>
              <MyButton
                onClick={() => setIsAddColor(true)}
                type="button"
                name="addColorForm"
                id="addColorForm"
                className="mr-2 p-2 px-4 rounded-md bg-primary-500 flex flex-row justify-center items-center gap-3 text-white">
                <p>زیادکردنی ڕەنگ</p>
                <BadgePlus />
              </MyButton>
              <div className="w-full flex flex-row justify-start items-start gap-10 flex-wrap">
                {colors.map((val: Part, _index: number) => (
                  <ColorCard key={val.id} {...val} />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h2 className="space-y-5  text-md md:text-lg font-bukra font-bold">
                جۆرەکانی خەرجی
              </h2>
              <MyButton
                onClick={() => setIsAddExpenseType(true)}
                type="button"
                name="addExpenseTypeForm"
                id="addExpenseTypeForm"
                className="mr-2 p-2 px-4 rounded-md bg-primary-500 flex flex-row justify-center items-center gap-3 text-white">
                <p>زیادکردنی جۆری خەرجی</p>
                <BadgePlus />
              </MyButton>
              <div className="w-full flex flex-row justify-start items-start gap-10 flex-wrap">
                {expenseTypes.map((val: Part, _index: number) => (
                  <ExpenseTypeCard key={val.id} {...val} />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h2 className="space-y-5  text-md md:text-lg font-bukra font-bold">
                خزمەتگوزاریەکان
              </h2>
              <MyButton
                onClick={() => setIsAddService(true)}
                type="button"
                name="addServiceForm"
                id="addServiceForm"
                className="mr-2 p-2 px-4 rounded-md bg-primary-500 flex flex-row justify-center items-center gap-3 text-white">
                <p>زیادکردنی خزمەتگوزاری</p>
                <BadgePlus />
              </MyButton>
              <div className="w-full flex flex-row justify-start items-start gap-10 flex-wrap">
                {services.map((val: Part, _index: number) => (
                  <ServiceCard key={val.id} {...val} />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h2 className="space-y-5  text-md md:text-lg font-bukra font-bold">
                بەشەکان
              </h2>

              <div className="w-full flex flex-row justify-start items-start gap-10 flex-wrap">
                {parts.map((val: Part, _index: number) => (
                  <PartCard key={val.id} {...val} />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </Container>
      {isAddRole && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={isAddRole}
          onClose={() => setIsAddRole(false)}>
          <RoleForm state="insert" onClose={() => setIsAddRole(false)} />
          <button
            name="closeRoleFormButton"
            onClick={() => setIsAddRole(false)}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-bukra">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}

      {isAddCarModel && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={isAddCarModel}
          onClose={() => setIsAddCarModel(false)}>
          <CarModelForm
            state="insert"
            onClose={() => setIsAddCarModel(false)}
          />
          <button
            name="closeCarModelFormButton"
            onClick={() => setIsAddCarModel(false)}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-bukra">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}

      {isAddCarType && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={isAddCarType}
          onClose={() => setIsAddCarType(false)}>
          <CarTypeForm state="insert" onClose={() => setIsAddCarType(false)} />
          <button
            name="closeCarTypeFormButton"
            onClick={() => setIsAddCarType(false)}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-bukra">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}

      {isAddColor && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={isAddColor}
          onClose={() => setIsAddColor(false)}>
          <ColorForm state="insert" onClose={() => setIsAddColor(false)} />
          <button
            name="closeColorFormButton"
            onClick={() => setIsAddColor(false)}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-bukra">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}

      {isAddService && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={isAddService}
          onClose={() => setIsAddService(false)}>
          <ServiceForm state="insert" onClose={() => setIsAddService(false)} />
          <button
            name="closeServiceFormButton"
            onClick={() => setIsAddService(false)}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-bukra">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}

      {isAddExpenseType && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={isAddExpenseType}
          onClose={() => setIsAddExpenseType(false)}>
          <ExpenseTypeForm
            state="insert"
            onClose={() => setIsAddExpenseType(false)}
          />
          <button
            name="closeExpenseTypeFormButton"
            onClick={() => setIsAddExpenseType(false)}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-bukra">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
    </>
  );
};

export default Setting;
