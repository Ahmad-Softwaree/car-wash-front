import Container from "@/components/ui/Container";
import { lazy, useMemo, useRef, useState } from "react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));
const ExpenseCard = lazy(() => import("@/components/cards/ExpenseCard"));

import {
  useDeleteExpense,
  useGetDeletedExpenses,
  useGetExpenses,
  useRestoreExpense,
  useSearchDeletedExpenses,
  useSearchExpenses,
} from "@/lib/react-query/query/expense.query";
import Pagination from "@/components/providers/Pagination";
import { Expense } from "@/types/expense";
import ExpenseForm from "@/components/forms/ExpenseForm";
import TBody from "@/components/ui/TBody";
import { Table, Td, Th, THead, Tr } from "@/components/ui";

import Input from "@/components/ui/Input";
import { InputGroup } from "@chakra-ui/react";

import { CONTEXT_TYPEs } from "@/context/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";

import DeleteModal from "@/components/ui/DeleteModal";
import CustomClose from "@/components/shared/CustomClose";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import DeleteChip from "@/components/shared/DeleteChip";
import RestoreChip from "@/components/shared/RestoreChip";
import AddButton from "@/components/shared/AddButton";
import RestoreModal from "@/components/ui/RestoreModal";

import { Badge, Button } from "@mui/joy";
import { Filter } from "lucide-react";
import FilterModal from "@/components/shared/FilterModal";
import Search from "@/components/shared/Search";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";

const Expenses = () => {
  const { deleted_page } = useCheckDeletedPage();
  const { mutateAsync, isPending } = useDeleteExpense();
  const { mutateAsync: restore, isPending: restoreLoading } =
    useRestoreExpense();
  const tableRef = useRef<HTMLDivElement>(null);

  const [searchParam, setSearchParam] = useSearchParams();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isRestore, setIsRestore] = useState<boolean>(false);

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start"
      >
        <div className="w-full gap-5 flex flex-row justify-between flex-wrap ">
          <div className=" flex flex-row justify-start items-center gap-3 flex-wrap md:flex-nowrap">
            <Search placeholder="گەڕان بەپێی داغڵکار/نوێکەرەوە" />

            <Badge
              invisible={
                !searchParam.get(ENUMs.FROM_PARAM as string) &&
                !searchParam.get(ENUMs.TO_PARAM as string) &&
                !searchParam.get(ENUMs.EXPENSE_TYPE_PARAM as string) &&
                !searchParam.get(ENUMs.USER_FILTER_PARAM as string)
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Filter
                onClick={() => setFilter(true)}
                className="w-11 h-11 p-2 rounded-md dark-light hover:light-dark cursor-pointer default-border transition-all duration-200"
              />
            </Badge>
            {(searchParam.get(ENUMs.FROM_PARAM as string) &&
              searchParam.get(ENUMs.TO_PARAM as string)) ||
            searchParam.get(ENUMs.EXPENSE_TYPE_PARAM as string) ||
            searchParam.get(ENUMs.USER_FILTER_PARAM as string) ? (
              <Button
                onClick={() => {
                  setSearchParam((prev) => {
                    const params = new URLSearchParams(prev);
                    params.delete(ENUMs.FROM_PARAM as string);
                    params.delete(ENUMs.TO_PARAM as string);
                    params.delete(ENUMs.USER_FILTER_PARAM as string);

                    params.delete(ENUMs.EXPENSE_TYPE_PARAM as string);
                    return params;
                  });
                }}
                className="!font-bukra !text-xs text-nowrap "
                size="md"
                variant="soft"
                color="danger"
              >
                سڕینەوەی فلتەر
              </Button>
            ) : null}
          </div>
          <div className="flex flex-row justify-end items-center gap-3">
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

        <Pagination<Expense[]>
          queryFn={() =>
            deleted_page
              ? useGetDeletedExpenses(
                  searchParam.get(ENUMs.EXPENSE_TYPE_PARAM as string) || "",
                  searchParam.get(ENUMs.FROM_PARAM as string) || "",
                  searchParam.get(ENUMs.TO_PARAM as string) || "",
                  searchParam.get(ENUMs.USER_FILTER_PARAM as string) || ""
                )
              : useGetExpenses(
                  searchParam.get(ENUMs.EXPENSE_TYPE_PARAM as string) || "",
                  searchParam.get(ENUMs.FROM_PARAM as string) || "",
                  searchParam.get(ENUMs.TO_PARAM as string) || "",
                  searchParam.get(ENUMs.USER_FILTER_PARAM as string) || ""
                )
          }
          searchQueryFn={() =>
            deleted_page
              ? useSearchDeletedExpenses(
                  searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                )
              : useSearchExpenses(
                  searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                )
          }
        >
          {({
            isFetchingNextPage,
            hasNextPage,
            ref,
            searchLoading,
            data,
            isSearched,
            searchData,
            isLoading,
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
            if (isLoading || searchLoading) {
              return (
                <Loading>
                  <TailSpin />
                </Loading>
              );
            }

            return (
              <>
                <div
                  ref={tableRef}
                  className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll"
                >
                  <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                    <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                      <Tr>
                        <Th className="text-center text-sm !p-4 !min-w-[100px]">
                          <InputGroup className="checkbox-input">
                            <Input
                              onChange={() => {
                                tableRef.current?.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                                if (checked.length == 0) {
                                  dispatch({
                                    type: CONTEXT_TYPEs.CHECK,
                                    payload: allData
                                      .slice(0, ENUMs.CHECK_LIMIT as number)
                                      .map(
                                        (val: Expense, _index: number) => val.id
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
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-1">#</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">جۆری خەرجی</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">بڕی خەرجکراو</p>
                        </Th>{" "}
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">بەروار</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">داغڵکار</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">نوێکەرەوە</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">کرادرەکان</p>
                        </Th>
                      </Tr>
                    </THead>
                    <TBody className="w-full ">
                      <>
                        {allData?.map((val: Expense, index: number) => (
                          <ExpenseCard key={val.id} index={index} {...val} />
                        ))}

                        {!isFetchingNextPage && hasNextPage && !isSearched && (
                          <div className="h-[20px]" ref={ref}></div>
                        )}
                      </>
                    </TBody>
                  </Table>
                </div>
                <div className="w-full flex flex-row justify-center items-center z-[100]  table-dark-light   default-border p-2 ">
                  <p className="text-center">ژمارەی داتا {allData.length}</p>
                </div>
              </>
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
          onClose={() => setIsDelete(false)}
        >
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
          onClose={() => setIsRestore(false)}
        >
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
          maxWidth={1500}
          maxHeight={`90%`}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
        >
          <CustomClose onClick={() => setIsAddOpen(false)} />
          <ExpenseForm state="insert" onClose={() => setIsAddOpen(false)} />
        </Dialog>
      )}
      {filter && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={filter}
          onClose={() => setFilter(false)}
        >
          <CustomClose onClick={() => setFilter(false)} />
          <FilterModal onClose={() => setFilter(false)} type="expense" />
        </Dialog>
      )}
    </>
  );
};

export default Expenses;
