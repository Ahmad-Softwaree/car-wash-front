import Container from "@/components/ui/Container";
import { lazy, useMemo, useState } from "react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));
const ExpenseTypeCard = lazy(
  () => import("@/components/cards/ExpenseTypeCard")
);

import {
  useDeleteExpenseType,
  useGetDeletedExpenseTypes,
  useGetExpenseTypes,
  useRestoreExpenseType,
  useSearchDeletedExpenseTypes,
  useSearchExpenseTypes,
} from "@/lib/react-query/query/expense-type.query";
import Pagination from "@/components/providers/Pagination";
import { ExpenseType } from "@/types/expense-type";
import ExpenseTypeForm from "@/components/forms/ExpenseTypeForm";
import TBody from "@/components/ui/TBody";
import { Table, Td, Th, THead, Tr } from "@/components/ui";

import Input from "@/components/ui/Input";
import { InputGroup } from "@chakra-ui/react";

import { CONTEXT_TYPEs } from "@/context/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

import DeleteModal from "@/components/ui/DeleteModal";
import TFoot from "@/components/ui/TFoot";
import CustomClose from "@/components/shared/CustomClose";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import DeleteChip from "@/components/shared/DeleteChip";
import RestoreChip from "@/components/shared/RestoreChip";
import Search from "@/components/shared/Search";
import AddButton from "@/components/shared/AddButton";
import RestoreModal from "@/components/ui/RestoreModal";
import DatePicker from "@/components/shared/DatePicker";

const ExpenseTypes = () => {
  const { deleted_page } = useCheckDeletedPage();
  const { mutateAsync, isPending } = useDeleteExpenseType();
  const { mutateAsync: restore, isPending: restoreLoading } =
    useRestoreExpenseType();

  const [searchParam, setSearchParam] = useSearchParams();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start">
        <div className="w-full gap-5 flex flex-row justify-between">
          <div className=" flex flex-row justify-start items-center gap-3 flex-wrap md:flex-nowrap">
            {" "}
            <Search />
          </div>
          <div className="w-full flex flex-row justify-end items-center gap-3">
            {checked?.length > 0 && (
              <div className="flex flex-row justify-center items-center gap-2 dark-light">
                {deleted_page ? (
                  <RestoreChip onClick={() => setIsRestore(true)} />
                ) : (
                  <DeleteChip onClick={() => setIsDelete(true)} />
                )}
                <p dir="ltr">
                  {checked.length} / {ENUMs.CHECK_LIMIT}
                </p>
              </div>
            )}
            {!deleted_page && <AddButton onClick={() => setIsAddOpen(true)} />}
          </div>
        </div>
        {/* <DatePicker /> */}

        <Pagination<ExpenseType[]>
          queryFn={() =>
            deleted_page
              ? useGetDeletedExpenseTypes(
                  searchParam.get(ENUMs.FROM_PARAM as string) || "",
                  searchParam.get(ENUMs.TO_PARAM as string) || ""
                )
              : useGetExpenseTypes(
                  searchParam.get(ENUMs.FROM_PARAM as string) || "",
                  searchParam.get(ENUMs.TO_PARAM as string) || ""
                )
          }
          searchQueryFn={() =>
            deleted_page
              ? useSearchDeletedExpenseTypes(
                  searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                )
              : useSearchExpenseTypes(
                  searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                )
          }>
          {({
            isFetchingNextPage,
            hasNextPage,
            isLoading,
            ref,
            data,
            refetch,
            isSearched,
            searchData,
            searchRefetch,
            fetchNextPage,
          }) => {
            const allData = useMemo(
              () =>
                !isSearched
                  ? data?.pages && data?.pages?.length > 0
                    ? data.pages.map((page) => page.paginatedData).flat()
                    : []
                  : searchData && searchData.length > 0
                  ? searchData
                  : [],
              [data, searchData, isSearched]
            );

            return (
              <div className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll">
                <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                  <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                    <Tr>
                      <Th className="text-right text-sm !p-4 !min-w-[100px]">
                        <InputGroup className="checkbox-input">
                          <Input
                            onChange={() => {
                              if (checked.length == 0) {
                                dispatch({
                                  type: CONTEXT_TYPEs.CHECK,
                                  payload: allData
                                    .slice(0, 30)
                                    .map(
                                      (val: ExpenseType, _index: number) =>
                                        val.id
                                    ),
                                });
                              } else {
                                dispatch({
                                  type: CONTEXT_TYPEs.CHECK,
                                  payload: [],
                                });
                              }
                            }}
                            checked={check_type == "all"}
                            type="checkbox"
                            className="cursor-pointer"
                          />
                        </InputGroup>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-1">#</p>
                      </Th>
                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">ناو</p>
                      </Th>

                      <Th className="text-right text-sm !p-4">
                        <p className="pr-3 table-head-border">کرادرەکان</p>
                      </Th>
                    </Tr>
                  </THead>
                  <TBody className="w-full ">
                    <>
                      {allData?.map((val: ExpenseType, index: number) => (
                        <ExpenseTypeCard key={val.id} index={index} {...val} />
                      ))}

                      {!isFetchingNextPage && hasNextPage && !isSearched && (
                        <div className="h-[20px]" ref={ref}></div>
                      )}
                    </>
                  </TBody>
                  <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
                    <Tr>
                      <Td className="text-center" colSpan={9}>
                        ژمارەی داتا {allData.length}
                      </Td>
                    </Tr>
                  </TFoot>
                </Table>
              </div>
            );
          }}
        </Pagination>
      </Container>
      {isDelete && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}>
          <DeleteModal
            deleteFunction={() => mutateAsync(checked)}
            loading={isPending}
            onClose={() => setIsDelete(false)}
          />
        </Dialog>
      )}
      {isRestore && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={isRestore}
          onClose={() => setIsRestore(false)}>
          <RestoreModal
            deleteFunction={() => restore(checked)}
            loading={restoreLoading}
            onClose={() => setIsRestore(false)}
          />
        </Dialog>
      )}
      {isAddOpen && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={800}
          maxHeight={`90%`}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}>
          <CustomClose onClick={() => setIsAddOpen(false)} />
          <ExpenseTypeForm state="insert" onClose={() => setIsAddOpen(false)} />
        </Dialog>
      )}
    </>
  );
};

export default ExpenseTypes;
