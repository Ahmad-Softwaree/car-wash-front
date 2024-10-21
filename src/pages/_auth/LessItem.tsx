import Container from "@/components/ui/Container";
import { lazy, useMemo, useRef, useState } from "react";
const Dialog = lazy(() => import("@/components/shared/Dialog"));

import Pagination from "@/components/providers/Pagination";
import TBody from "@/components/ui/TBody";
import { Table, Td, Th, THead, Tr } from "@/components/ui";

import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";

import { CONTEXT_TYPEs } from "@/context/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import DeleteModal from "@/components/ui/DeleteModal";
import {
  useDeleteItem,
  useGetLessItems,
  useSearchLessItems,
} from "@/lib/react-query/query/item.query";
import { Item } from "@/types/items";
import ItemCard from "@/components/cards/ItemCard";
import DeleteChip from "@/components/shared/DeleteChip";

import Search from "@/components/shared/Search";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";
import { Badge, Button } from "@mui/joy";
import { Filter } from "lucide-react";
import CustomClose from "@/components/shared/CustomClose";
import FilterModal from "@/components/shared/FilterModal";

const ItemLess = () => {
  const { mutateAsync, isPending } = useDeleteItem();
  const [searchParam, setSearchParam] = useSearchParams();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);
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
            <Search placeholder="گەڕان بەپێێ ناو/بارکۆد" />

            <Badge
              invisible={
                !searchParam.get(ENUMs.ITEM_TYPE_PARAM as string) &&
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
            {(searchParam.get(ENUMs.ITEM_TYPE_PARAM as string) ||
              searchParam.get(ENUMs.USER_FILTER_PARAM as string)) && (
              <Button
                onClick={() => {
                  setSearchParam((prev) => {
                    const params = new URLSearchParams(prev);
                    params.delete(ENUMs.ITEM_TYPE_PARAM as string);
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
        {/* <DatePicker /> */}
        <Pagination<Item[]>
          queryFn={() =>
            useGetLessItems(
              searchParam.get(ENUMs.ITEM_TYPE_PARAM as string) || "",
              searchParam.get(ENUMs.USER_FILTER_PARAM as string) || "",

              searchParam.get(ENUMs.FROM_PARAM as string) || "",
              searchParam.get(ENUMs.TO_PARAM as string) || ""
            )
          }
          searchQueryFn={() =>
            useSearchLessItems(
              searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
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
                  <Table className="relative  w-full table-dark-light  default-border">
                    <THead className="sticky -top-1 z-[100]  table-dark-light w-full  default-border">
                      <Tr>
                        <Th className="text-right text-sm !p-4 !min-w-[100px]">
                          <InputGroup className="checkbox-input">
                            <Input
                              onClick={() => {
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
                                        (val: Item, _index: number) => val.id
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
                          <p className="pr-3 table-head-border">وێنە</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">بارکۆد</p>
                        </Th>{" "}
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">جۆر</p>
                        </Th>{" "}
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">
                            کەمترین عددی مەواد
                          </p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">عدد</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">تێچوو</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">نرخی فرۆشتن</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">داغڵکار</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">چاککار</p>
                        </Th>
                        <Th className="text-right text-sm !p-4">
                          <p className="pr-3 table-head-border">کردارەکان</p>
                        </Th>
                      </Tr>
                    </THead>
                    <TBody className="w-full">
                      <>
                        {allData?.map((val: Item, index: number) => (
                          <ItemCard key={val.id} index={index} {...val} />
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
      {filter && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={filter}
          onClose={() => setFilter(false)}
        >
          <CustomClose onClick={() => setFilter(false)} />
          <FilterModal onClose={() => setFilter(false)} type="item" />
        </Dialog>
      )}
    </>
  );
};

export default ItemLess;
