import Container from "@/components/ui/Container";
import AddButton from "@/components/shared/AddButton";
import { useEffect, useMemo, useRef, useState } from "react";
import Calendar from "@/components/shared/Calender";
import Dialog from "@/components/shared/Dialog";
import CustomClose from "@/components/shared/CustomClose";
import ReservationForm from "@/components/forms/ReservationFrom";
import useCheckDeletedPage from "@/hooks/useCheckDeletedPage";
import { useGlobalContext } from "@/context/GlobalContext";
import RestoreChip from "@/components/shared/RestoreChip";
import { ENUMs } from "@/lib/enum";
import Search from "@/components/shared/Search";

import { CONTEXT_TYPEs } from "@/context/types";

import {
  useGetDeletedReservations,
  useRestoreReservation,
  useSearchDeletedReservations,
} from "@/lib/react-query/query/reservation.query";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/providers/Pagination";
import { Reservation } from "@/types/reservation";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import InputGroup from "@/components/ui/InputGroup";
import Input from "@/components/ui/Input";
import TBody from "@/components/ui/TBody";
import ReservationCard from "@/components/cards/ReservationCard";
import TFoot from "@/components/ui/TFoot";
import DeleteModal from "@/components/ui/DeleteModal";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";
import { Badge, Button } from "@mui/joy";
import { Filter } from "lucide-react";
import MyButton from "@/components/ui/MyButton";
import FilterModal from "@/components/shared/FilterModal";

const Reservations = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const [isAdd, setIsAdd] = useState<boolean>(false);
  const { deleted_page } = useCheckDeletedPage();
  const [isRestore, setIsRestore] = useState<boolean>(false);
  const { mutateAsync, isPending } = useRestoreReservation();
  let filter_param = searchParam.get(ENUMs.FILTER_PARAM as string);
  const tableRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<boolean>(false);

  const changeFilter = (
    filter_param: "all" | "completed" | "not_completed"
  ): void => {
    setSearchParam((prev) => {
      const params = new URLSearchParams(prev);
      params.set(ENUMs.FILTER_PARAM as string, filter_param);
      return params;
    });
  };
  useEffect(() => {
    if (!filter_param) changeFilter("all");
  }, []);
  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-0 flex flex-col justify-start items-start"
      >
        <div className="w-full gap-5 flex flex-row justify-between flex-wrap mb-5 ">
          {deleted_page && (
            <div className=" flex flex-row justify-start items-center gap-3 flex-wrap md:flex-nowrap">
              <Search />
              <div className="flex flex-row justify-start items-center gap-5 flex-wrap">
                <MyButton
                  title="all"
                  id="all"
                  name="all"
                  onClick={() => changeFilter("all")}
                  className={`p-2 rounded-md default-border !border-blue-500  text-xs md:text-sm transition-all duration-200 hover:!text-white hover:!bg-blue-500 ${
                    filter_param == "all"
                      ? "!bg-blue-500 text-white"
                      : "dark-light"
                  }`}
                >
                  گشت
                </MyButton>
                <MyButton
                  title="all"
                  id="all"
                  name="all"
                  onClick={() => changeFilter("completed")}
                  className={`p-2 rounded-md default-border !border-blue-500  text-xs md:text-sm transition-all duration-200 hover:!text-white hover:!bg-blue-500 ${
                    filter_param == "completed"
                      ? "!bg-blue-500 text-white"
                      : "dark-light"
                  }`}
                >
                  تەواوبووەکان
                </MyButton>
                <MyButton
                  title="all"
                  id="all"
                  name="all"
                  onClick={() => changeFilter("not_completed")}
                  className={`p-2 rounded-md default-border !border-blue-500  text-xs md:text-sm transition-all duration-200 hover:!text-white hover:!bg-blue-500 ${
                    filter_param == "not_completed"
                      ? "!bg-blue-500 text-white"
                      : "dark-light"
                  }`}
                >
                  تەواونەبووەکان
                </MyButton>
                <Badge
                  invisible={
                    !(
                      searchParam.get(ENUMs.COLOR_FILTER_PARAM as string) ||
                      searchParam.get(ENUMs.CAR_TYPE_FILTER_PARAM as string) ||
                      searchParam.get(ENUMs.CAR_MODEL_FILTER_PARAM as string) ||
                      searchParam.get(ENUMs.SERVICE_FILTER_PARAM as string) ||
                      searchParam.get(ENUMs.USER_FILTER_PARAM as string)
                    )
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
                {(searchParam.get(ENUMs.COLOR_FILTER_PARAM as string) ||
                  searchParam.get(ENUMs.CAR_TYPE_FILTER_PARAM as string) ||
                  searchParam.get(ENUMs.CAR_MODEL_FILTER_PARAM as string) ||
                  searchParam.get(ENUMs.SERVICE_FILTER_PARAM as string) ||
                  searchParam.get(ENUMs.USER_FILTER_PARAM as string)) && (
                  <Button
                    onClick={() => {
                      setSearchParam((prev) => {
                        const params = new URLSearchParams(prev);
                        params.delete(ENUMs.COLOR_FILTER_PARAM as string);
                        params.delete(ENUMs.CAR_TYPE_FILTER_PARAM as string);
                        params.delete(ENUMs.CAR_MODEL_FILTER_PARAM as string);
                        params.delete(ENUMs.SERVICE_FILTER_PARAM as string);
                        params.delete(ENUMs.USER_FILTER_PARAM as string);
                        return params;
                      });
                    }}
                    className="!font-bukra !text-xs"
                    size="md"
                    variant="soft"
                    color="danger"
                  >
                    سڕینەوەی فلتەر
                  </Button>
                )}
              </div>
            </div>
          )}
          <div className=" flex flex-row justify-end items-center gap-3">
            {checked?.length > 0 && deleted_page && (
              <div className="flex flex-row justify-center items-center gap-2 dark-light">
                <RestoreChip onClick={() => setIsRestore(true)} />

                <p dir="ltr">
                  {checked.length} / {ENUMs.CHECK_LIMIT}
                </p>
              </div>
            )}
            {!deleted_page && <AddButton onClick={() => setIsAdd(true)} />}
          </div>
        </div>
        {!deleted_page && <Calendar />}
        {deleted_page && (
          <>
            <Pagination<Reservation[]>
              queryFn={() =>
                useGetDeletedReservations(
                  searchParam.get(ENUMs.FROM_PARAM as string) || "",
                  searchParam.get(ENUMs.TO_PARAM as string) || "",
                  searchParam.get(ENUMs.FILTER_PARAM as string) || "",
                  searchParam.get(ENUMs.COLOR_FILTER_PARAM as string) || "",
                  searchParam.get(ENUMs.CAR_MODEL_FILTER_PARAM as string) || "",
                  searchParam.get(ENUMs.CAR_TYPE_FILTER_PARAM as string) || "",
                  searchParam.get(ENUMs.SERVICE_FILTER_PARAM as string) || "",
                  searchParam.get(ENUMs.USER_FILTER_PARAM as string) || ""
                )
              }
              searchQueryFn={() =>
                useSearchDeletedReservations(
                  searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
                )
              }
            >
              {({
                isFetchingNextPage,
                hasNextPage,
                isLoading,
                ref,
                data,
                searchLoading,
                isSearched,
                searchData,
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
                if (searchLoading || isLoading) {
                  return (
                    <Loading>
                      <TailSpin />
                    </Loading>
                  );
                }

                return (
                  <>
                    <div className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll">
                      <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                        <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                          <Tr>
                            <Th className="text-center text-sm !p-4 !min-w-[100px]">
                              <InputGroup className="checkbox-input">
                                <Input
                                  onChange={() => {
                                    if (checked.length == 0) {
                                      dispatch({
                                        type: CONTEXT_TYPEs.CHECK,
                                        payload: allData
                                          .slice(0, ENUMs.CHECK_LIMIT as number)
                                          .map(
                                            (
                                              val: Reservation,
                                              _index: number
                                            ) => val.id
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
                              <p className="pr-3 table-head-border">
                                ناوی موشتەری
                              </p>
                            </Th>
                            <Th className="text-center text-sm !p-4">
                              <p className="pr-3 table-head-border">
                                بەروار و کات
                              </p>
                            </Th>{" "}
                            <Th className="text-center text-sm !p-4">
                              <p className="pr-3 table-head-border">
                                خزمەتگوزاری
                              </p>
                            </Th>
                            <Th className="text-center text-sm !p-4">
                              <p className="pr-3 table-head-border">
                                جۆری ئۆتۆمبێل
                              </p>
                            </Th>
                            <Th className="text-center text-sm !p-4">
                              <p className="pr-3 table-head-border">
                                مۆدێلی ئۆتۆمبێل
                              </p>
                            </Th>
                            <Th className="text-center text-sm !p-4">
                              <p className="pr-3 table-head-border">ڕەنگ</p>
                            </Th>
                            <Th className="text-center text-sm !p-4">
                              <p className="pr-3 table-head-border">
                                کردارەکان
                              </p>
                            </Th>
                          </Tr>
                        </THead>
                        <TBody className="w-full ">
                          <>
                            {allData?.map((val: Reservation, index: number) => (
                              <ReservationCard key={val.id} {...val} />
                            ))}

                            {!isFetchingNextPage &&
                              hasNextPage &&
                              !isSearched && (
                                <div className="h-[20px]" ref={ref}></div>
                              )}
                          </>
                        </TBody>
                      </Table>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center z-[100]  table-dark-light mt-2  default-border p-2 ">
                      <p className="text-center">
                        ژمارەی داتا {allData.length}
                      </p>
                    </div>
                  </>
                );
              }}
            </Pagination>
          </>
        )}
      </Container>
      {isAdd && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={1500}
          maxHeight={`90%`}
          isOpen={isAdd}
          onClose={() => setIsAdd(false)}
        >
          <CustomClose onClick={() => setIsAdd(false)} />
          <ReservationForm state="insert" onClose={() => setIsAdd(false)} />
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
          <DeleteModal
            deleteFunction={() => mutateAsync(checked)}
            loading={isPending}
            onClose={() => setIsRestore(false)}
          />
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
          <FilterModal onClose={() => setFilter(false)} type="reservation" />
        </Dialog>
      )}
    </>
  );
};

export default Reservations;
