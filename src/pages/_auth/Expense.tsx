import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";
import { lazy, useCallback, useMemo, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));
const ExpenseForm = lazy(() => import("@/components/forms/ExpenseForm"));
const ExpenseCard = lazy(() => import("@/components/cards/ExpenseCard"));

import { useGetExpenses } from "@/lib/react-query/query/expense.query";
import { TailSpin } from "react-loader-spinner";
import { Expense as ExpenseType } from "@/types/expense";

import ExpenseDetailCard from "@/components/cards/ExpenseDetailCard";
import Loading from "@/components/ui/Loading";
import { Id } from "@/types/global";
import Pagination from "@/components/providers/Pagination";

const Expense = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  const openDialog = useCallback(
    (type: "form" | "card") =>
      type === "form" ? setIsFormOpen(true) : setIsCardOpen(true),
    [isFormOpen, isCardOpen]
  );
  const closeDialog = useCallback(
    (type: "form" | "card") =>
      type === "form" ? setIsFormOpen(false) : setIsCardOpen(false),
    [isFormOpen, isCardOpen]
  );

  const [activeExpense, setActiveExpense] = useState<ExpenseType | null>(null);

  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start ">
        <div className="w-full flex flex-row justify-between">
          <Return>خەرجیەکان</Return>
          <button
            title="newExpense"
            type="button"
            onClick={() => openDialog("form")}
            name="newExpense"
            className="flex flex-row gap-2 p-3 bg-black-500 text-white rounded-sm px-5">
            <CircleFadingPlus />
            <p>خەرجی نوێ</p>
          </button>
        </div>
        <Pagination<ExpenseType[]> queryFn={() => useGetExpenses()}>
          {({ isFetchingNextPage, data, hasNextPage, isLoading, ref }) => {
            const allData = useMemo(
              () =>
                data?.pages && data?.pages?.length > 0
                  ? data.pages.map((page) => page.paginatedData).flat()
                  : [],
              [data]
            );
            const onClick = async (id: Id) => {
              await setActiveExpense(
                allData?.find((val: ExpenseType) => val.id == id) || null
              );
              openDialog("card");
            };
            if (isLoading) {
              return (
                <Loading screen>
                  <TailSpin />
                </Loading>
              );
            }
            return (
              <>
                <div className="w-full flex flex-row justify-start items-center gap-6 flex-wrap">
                  {allData.map((val: ExpenseType, _index: number) => (
                    <ExpenseCard onClick={onClick} key={val.id} {...val} />
                  ))}
                </div>

                {!isFetchingNextPage && hasNextPage && (
                  <div title="expenseButton" id="expenseButton" ref={ref}>
                    <Loading>
                      <TailSpin />
                    </Loading>
                  </div>
                )}
              </>
            );
          }}
        </Pagination>
      </Container>
      {isCardOpen && activeExpense && (
        <Dialog
          className="!p-5"
          maxHeight={`90%`}
          isOpen={isCardOpen}
          onClose={() => closeDialog("card")}>
          <ExpenseDetailCard {...activeExpense} />
          <button
            onClick={() => closeDialog("card")}
            name="removeExpenseDetailCard"
            type="button"
            className="w-full bg-black-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2 mt-2">
            <p className="font-bold font-bukra">لابردن</p>
          </button>
        </Dialog>
      )}
      {isFormOpen && (
        <Dialog
          className="!p-5"
          maxHeight={`90%`}
          isOpen={isFormOpen}
          onClose={() => closeDialog("form")}>
          <ExpenseForm state="insert" onClose={() => closeDialog("form")} />
          <button
            name="closeExpenseFormButton"
            onClick={() => closeDialog("form")}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-bukra">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
    </>
  );
};

export default Expense;
