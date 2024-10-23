import Search from "@/components/shared/Search";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import TBody from "@/components/ui/TBody";
import { useSearchParams } from "react-router-dom";
import {
  useGetKogaNullReport,
  useGetKogaNullReportInformation,
  useGetKogaNullReportInformationSearch,
  useGetKogaNullReportSearch,
  useKogaNullPrint,
} from "@/lib/react-query/query/report.query";
import { ENUMs } from "@/lib/enum";
import Pagination from "@/components/providers/Pagination";
import { useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/components/shared/FormatMoney";
import { Filter, Printer } from "lucide-react";
import { Badge, Button, Chip } from "@mui/joy";
import Dialog from "@/components/shared/Dialog";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";
import CustomClose from "@/components/shared/CustomClose";
import FilterModal from "@/components/shared/FilterModal";
import { ItemKoga } from "@/types/items";
import ItemKogaReportCard from "@/components/cards/ItemKogaReportCard";

const KogaNullReportList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  let search = searchParam.get(ENUMs.SEARCH_PARAM as string);
  let item_type = searchParam.get(ENUMs.ITEM_TYPE_PARAM as string);
  let user = searchParam.get(ENUMs.USER_FILTER_PARAM as string);

  const [filter, setFilter] = useState<boolean>(false);
  const { mutateAsync: print } = useKogaNullPrint(
    item_type || "",
    search || "",
    user || ""
  );
  const {
    data: reportData,
    isLoading,
    refetch,
  } = useGetKogaNullReportInformation(item_type || "", user || "");
  useEffect(() => {
    refetch();
  }, [item_type, user, refetch]);

  const {
    data: searchReportData,
    isLoading: searchLoading,
    refetch: searchRefetch,
  } = useGetKogaNullReportInformationSearch(search || "");
  useEffect(() => {
    searchRefetch();
  }, [searchRefetch, search]);

  let loading = isLoading || searchLoading;

  return (
    <>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap">
        <Search />
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
        <Chip onClick={() => print()} variant="soft" color="warning">
          <Printer className="w-11 h-11 p-2 cursor-pointer" />
        </Chip>
      </div>
      <Pagination<ItemKoga[]>
        queryFn={() =>
          useGetKogaNullReport(
            searchParam.get(ENUMs.ITEM_TYPE_PARAM as string) || "",
            searchParam.get(ENUMs.USER_FILTER_PARAM as string) || ""
          )
        }
        searchQueryFn={() =>
          useGetKogaNullReportSearch(
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
          if (isLoading) {
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
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-1">#</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">ناو</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">بارکۆد</p>
                      </Th>{" "}
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">جۆر</p>
                      </Th>{" "}
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">نرخی کڕین</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">دانەی کڕاو</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">نرخی فرۆشتن</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">دانەی فرۆشراو</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">دانەی ماوە</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">تێچوو</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">داغڵکار</p>
                      </Th>
                      <Th className="text-center text-sm !p-4">
                        <p className="pr-3 table-head-border">نوێکەرەوە</p>
                      </Th>
                    </Tr>
                  </THead>
                  <TBody className="w-full ">
                    <>
                      {allData?.map((val: ItemKoga, index: number) => (
                        <ItemKogaReportCard
                          key={val.id}
                          index={index}
                          {...val}
                        />
                      ))}
                      {!isFetchingNextPage && hasNextPage && !isSearched && (
                        <div className="h-[20px]" ref={ref}></div>
                      )}
                    </>
                  </TBody>
                </Table>
              </div>
              {!loading && reportData && searchReportData && (
                <div className="w-full flex flex-col justify-center items-center z-[100]  table-dark-light   default-border p-2 gap-5">
                  <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
                    <p>
                      کۆی ژمارەی کاڵا:{" "}
                      {!isSearched
                        ? reportData?.total_count
                        : searchReportData?.total_count}
                    </p>

                    <p>
                      کۆی دانەی کڕاو:{" "}
                      {!isSearched
                        ? formatMoney(reportData?.total_item_quantity)
                        : formatMoney(searchReportData?.total_item_quantity)}
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
                    <p>
                      کۆی دانەی فرۆشراو :{" "}
                      {!isSearched
                        ? formatMoney(reportData?.total_sell_quantity)
                        : formatMoney(searchReportData?.total_sell_quantity)}
                    </p>

                    <p>
                      کۆی دانەی ماوە :{" "}
                      {!isSearched
                        ? formatMoney(
                            reportData?.total_item_quantity -
                              reportData?.total_sell_quantity
                          )
                        : formatMoney(
                            searchReportData?.total_item_quantity -
                              searchReportData?.total_sell_quantity
                          )}
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
                    <p>
                      کۆی نرخی کڕاو :{" "}
                      {!isSearched
                        ? formatMoney(reportData?.total_purchase_price)
                        : formatMoney(searchReportData?.total_purchase_price)}
                    </p>

                    <p>
                      کۆی نرخی فرۆشراو :{" "}
                      {!isSearched
                        ? formatMoney(reportData?.total_sell_price)
                        : formatMoney(searchReportData?.total_sell_price)}
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
                    <p>
                      کۆی تێچوو :{" "}
                      {!isSearched
                        ? formatMoney(reportData?.total_cost)
                        : formatMoney(searchReportData?.total_cost)}
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-evenly items-center flex-wrap text-center">
                    ژمارەی داتا {allData.length}
                  </div>
                </div>
              )}
            </>
          );
        }}
      </Pagination>

      {filter && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={filter}
          onClose={() => setFilter(false)}
        >
          <CustomClose onClick={() => setFilter(false)} />
          <FilterModal onClose={() => setFilter(false)} type="koga_report" />
        </Dialog>
      )}
    </>
  );
};

export default KogaNullReportList;
