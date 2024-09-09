import Return from "@/components/shared/Return";
import Container from "@/components/ui/Container";
import { lazy, useCallback, useMemo, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));
const SpendForm = lazy(() => import("@/components/forms/SpendForm"));
const SpendCard = lazy(() => import("@/components/cards/SpendCard"));

import { useGetSpends } from "@/lib/react-query/query/spend.query";
import { TailSpin } from "react-loader-spinner";
import { Spend as SpendType } from "@/types/spend";

import SpendDetailCard from "@/components/cards/SpendDetailCard";
import Loading from "@/components/ui/Loading";
import { Id } from "@/types/global";
import Pagination from "@/components/providers/Pagination";

const Spend = () => {
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

  const [activeSpend, setActiveSpend] = useState<SpendType | null>(null);

  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start ">
        <div className="w-full flex flex-row justify-between">
          <Return>خەرجیەکان</Return>
          <button
            title="newSpend"
            type="button"
            onClick={() => openDialog("form")}
            name="newSpend"
            className="flex flex-row gap-2 p-3 bg-black-500 text-white rounded-sm px-5">
            <CircleFadingPlus />
            <p>خەرجی نوێ</p>
          </button>
        </div>
        <Pagination<SpendType[]> queryFn={() => useGetSpends()}>
          {({ isFetchingNextPage, data, hasNextPage, isLoading, ref }) => {
            const allData = useMemo(
              () =>
                data?.pages && data?.pages?.length > 0
                  ? data.pages.map((page) => page.paginatedData).flat()
                  : [],
              [data]
            );
            const onClick = async (id: Id) => {
              await setActiveSpend(
                allData?.find((val: SpendType) => val.id == id) || null
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
                  {allData.map((val: SpendType, _index: number) => (
                    <SpendCard onClick={onClick} key={val.id} {...val} />
                  ))}
                </div>

                {!isFetchingNextPage && hasNextPage && (
                  <div title="spendButton" id="spendButton" ref={ref}>
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
      {isCardOpen && activeSpend && (
        <Dialog
          className="!p-5"
          maxHeight={`90%`}
          isOpen={isCardOpen}
          onClose={() => closeDialog("card")}>
          <SpendDetailCard {...activeSpend} />
          <button
            onClick={() => closeDialog("card")}
            name="removeSpendDetailCard"
            type="button"
            className="w-full bg-black-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2 mt-2">
            <p className="font-bold font-rabar007">لابردن</p>
          </button>
        </Dialog>
      )}
      {isFormOpen && (
        <Dialog
          className="!p-5"
          maxHeight={`90%`}
          isOpen={isFormOpen}
          onClose={() => closeDialog("form")}>
          <SpendForm state="insert" onClose={() => closeDialog("form")} />
          <button
            name="closeSpendFormButton"
            onClick={() => closeDialog("form")}
            type="button"
            className="w-full  my-2 bg-red-600 rounded-sm p-4 text-white flex flex-row justify-center items-center gap-2">
            <p className="font-bold font-rabar007">هەڵوەشاندنەوە</p>
          </button>
        </Dialog>
      )}
    </>
  );
};

export default Spend;
