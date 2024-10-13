import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import { useGlobalContext } from "@/context/GlobalContext";
import DeleteChip from "./DeleteChip";
import { ENUMs } from "@/lib/enum";
import { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "./Dialog";
import DeleteModal from "../ui/DeleteModal";
import {
  useDeleteReservation,
  useGetReservations,
  useSearchReservations,
} from "@/lib/react-query/query/reservation.query";
import Pagination from "../providers/Pagination";
import { Reservation } from "@/types/reservation";
import { Table, Td, Th, THead, Tr } from "../ui";
import InputGroup from "../ui/InputGroup";
import Input from "../ui/Input";
import { CONTEXT_TYPEs } from "@/context/types";
import TBody from "../ui/TBody";
import ReservationCard from "../cards/ReservationCard";
import MyButton from "../ui/MyButton";
import Loading from "../ui/Loading";
import { TailSpin } from "react-loader-spinner";

const ReservationModal = ({ onClose }: { onClose: () => void }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { mutateAsync, isPending } = useDeleteReservation();
  let filter = searchParam.get(ENUMs.FILTER_PARAM as string);
  const tableRef = useRef<HTMLDivElement>(null);

  const changeFilter = (
    filter: "all" | "completed" | "not_completed"
  ): void => {
    setSearchParam((prev) => {
      const params = new URLSearchParams(prev);
      params.set(ENUMs.FILTER_PARAM as string, filter);
      return params;
    });
  };
  useEffect(() => {
    if (!filter) changeFilter("all");
  }, []);
  const {
    dispatch,
    state: { checked, check_type },
  } = useGlobalContext();
  return (
    <>
      <div className="py-4">
        <div className="w-full gap-5 flex flex-row justify-between flex-wrap  my-4">
          <div className=" flex flex-row justify-start items-center gap-3 flex-wrap md:flex-nowrap">
            <Search />

            <div className="flex flex-row justify-start items-center gap-5 flex-wrap">
              <MyButton
                title="all"
                id="all"
                name="all"
                onClick={() => changeFilter("all")}
                className={`p-2 rounded-md default-border !border-blue-500  text-xs md:text-sm transition-all duration-200 hover:!text-white hover:!bg-blue-500 ${
                  filter == "all" ? "!bg-blue-500 text-white" : "dark-light"
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
                  filter == "completed"
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
                  filter == "not_completed"
                    ? "!bg-blue-500 text-white"
                    : "dark-light"
                }`}
              >
                تەواونەبووەکان
              </MyButton>
            </div>
          </div>
          <div className=" flex flex-row justify-end items-center gap-3">
            {checked?.length > 0 && (
              <div className="flex flex-row justify-center items-center gap-2 dark-light">
                <DeleteChip onClick={() => setIsDelete(true)} />

                <p dir="ltr">
                  {checked.length} / {ENUMs.CHECK_LIMIT}
                </p>
              </div>
            )}
          </div>
        </div>

        <Pagination<Reservation[]>
          queryFn={() =>
            useGetReservations(
              new Date(
                decodeURIComponent(
                  searchParam.get(ENUMs.RESERVATION_PARAM as string) || ""
                )
              ) || "",
              searchParam.get(ENUMs.FILTER_PARAM as string) || ""
            )
          }
          searchQueryFn={() =>
            useSearchReservations(
              searchParam.get(ENUMs.SEARCH_PARAM as string) || "",
              new Date(
                decodeURIComponent(
                  searchParam.get(ENUMs.RESERVATION_PARAM as string) || ""
                )
              ) || ""
            )
          }
        >
          {({
            isFetchingNextPage,
            hasNextPage,
            ref,
            data,
            isSearched,
            searchData,
            searchLoading,
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

            if (searchLoading || isLoading) {
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
                        <Th className="text-center text-sm !p-4">
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
                                        (val: Reservation, _index: number) =>
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
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-1">#</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">نرخ</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">ناوی موشتەری</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">بەروار و کات</p>
                        </Th>{" "}
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">خزمەتگوزاری</p>
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
                          <p className="pr-3 table-head-border">دۆخ</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">داغڵکار</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">نوێکەرەوە</p>
                        </Th>
                        <Th className="text-center text-sm !p-4">
                          <p className="pr-3 table-head-border">کردارەکان</p>
                        </Th>
                      </Tr>
                    </THead>
                    <TBody className="w-full ">
                      <>
                        {allData?.map((val: Reservation, index: number) => (
                          <ReservationCard key={val.id} {...val} />
                        ))}

                        {!isFetchingNextPage && hasNextPage && !isSearched && (
                          <div className="h-[20px]" ref={ref}></div>
                        )}
                      </>
                    </TBody>
                  </Table>
                </div>
                <div className="w-full flex flex-row justify-center items-center z-[100]  table-dark-light mt-2  default-border p-2 ">
                  <p className="text-center">ژمارەی داتا {allData.length}</p>
                </div>
              </>
            );
          }}
        </Pagination>
      </div>
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
    </>
  );
};

export default ReservationModal;
