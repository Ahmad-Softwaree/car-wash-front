import Search from "@/components/shared/Search";
import DatePicker from "@/components/shared/DatePicker";
import TFoot from "@/components/ui/TFoot";
import { Table, Td, Th, THead, Tr } from "@/components/ui";
import TBody from "@/components/ui/TBody";
import { Sell } from "@/types/sell";
import SellCard from "@/components/cards/SellCard";
import { useSearchParams } from "react-router-dom";
import {
  useGetSellReport,
  useGetSellReportInformation,
  useGetSellReportInformationSearch,
  useGetSellReportSearch,
  useSellPrint,
} from "@/lib/react-query/query/report.query";
import { ENUMs } from "@/lib/enum";
import Pagination from "@/components/providers/Pagination";
import { useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/components/shared/FormatMoney";
import useDebounce from "@/hooks/useDebounce";
import { Filter, Printer } from "lucide-react";
import { Badge, Button, Chip } from "@mui/joy";
import PrintModal from "@/components/ui/PrintModal";
import Dialog from "@/components/shared/Dialog";
import Loading from "@/components/ui/Loading";
import { TailSpin } from "react-loader-spinner";
import CustomClose from "@/components/shared/CustomClose";
import FilterModal from "@/components/shared/FilterModal";
const KogaAllReportList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  let search = searchParam.get(ENUMs.SEARCH_PARAM as string);
  let from = searchParam.get(ENUMs.FROM_PARAM as string);
  let to = searchParam.get(ENUMs.TO_PARAM as string);
  const debounceValue = useDebounce(search, ENUMs.DEBOUNCE as number);
  const debounceFrom = useDebounce(from, ENUMs.DEBOUNCE as number);
  const debounceTo = useDebounce(to, ENUMs.DEBOUNCE as number);
  const [print, setPrint] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  const {
    data: reportData,
    isLoading,
    refetch,
  } = useGetSellReportInformation(from || "", to || "");
  useEffect(() => {
    refetch();
  }, [debounceFrom, debounceTo, refetch]);

  const {
    data: searchReportData,
    isLoading: searchLoading,
    refetch: searchRefetch,
  } = useGetSellReportInformationSearch(search || "");
  useEffect(() => {
    searchRefetch();
  }, [searchRefetch, debounceValue]);

  return (
    <>
      <div className="w-full flex flex-row justify-start items-center gap-5 flex-wrap">
        <Search />
        <Badge
          invisible={
            !searchParam.get(ENUMs.FROM_PARAM as string) &&
            !searchParam.get(ENUMs.TO_PARAM as string)
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}>
          <Filter
            onClick={() => setFilter(true)}
            className="w-11 h-11 p-2 rounded-md dark-light hover:light-dark cursor-pointer default-border transition-all duration-200"
          />
        </Badge>
        {searchParam.get(ENUMs.FROM_PARAM as string) &&
          searchParam.get(ENUMs.TO_PARAM as string) && (
            <Button
              onClick={() => {
                setSearchParam((prev) => {
                  const params = new URLSearchParams(prev);
                  params.delete(ENUMs.FROM_PARAM as string);
                  params.delete(ENUMs.TO_PARAM as string);

                  return params;
                });
              }}
              className="!font-bukra !text-xs"
              size="md"
              variant="soft"
              color="danger">
              سڕینەوەی فلتەر
            </Button>
          )}
        <Chip variant="soft" color="warning">
          <Printer
            onClick={() => {
              setPrint(true);
            }}
            className="w-11 h-11 p-2 cursor-pointer"
          />
        </Chip>
      </div>
      <Pagination<Sell[]>
        queryFn={() =>
          useGetSellReport(
            searchParam.get(ENUMs.FROM_PARAM as string) || "",
            searchParam.get(ENUMs.TO_PARAM as string) || ""
          )
        }
        searchQueryFn={() =>
          useGetSellReportSearch(
            searchParam.get(ENUMs.SEARCH_PARAM as string) || ""
          )
        }>
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
            <div className="w-full max-w-full overflow-x-auto max-h-[700px] hide-scroll">
              <Table className="relative  w-full table-dark-light !text-primary-800 dark:!text-white  default-border">
                <THead className="sticky -top-1   table-dark-light z-10 w-full  default-border">
                  <Tr>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-1">#</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">ژمارەی وەصڵ</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">بەروار</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">کۆی گشتی</p>
                    </Th>{" "}
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">داشکاندن</p>
                    </Th>{" "}
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">نرخ دوای داشکان</p>
                    </Th>{" "}
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">داغڵکار</p>
                    </Th>
                    <Th className="text-right text-sm !p-4">
                      <p className="pr-3 table-head-border">چاککار</p>
                    </Th>
                  </Tr>
                </THead>
                <TBody className="w-full ">
                  <>
                    {allData?.map((val: Sell, index: number) => (
                      <SellCard key={val.id} index={index} {...val} />
                    ))}
                    {!isFetchingNextPage && hasNextPage && !isSearched && (
                      <div className="h-[20px]" ref={ref}></div>
                    )}
                  </>
                </TBody>
                <TFoot className="sticky -bottom-1 z-[100]  table-dark-light w-full  default-border">
                  <Tr className="!default-border">
                    <Td className="text-center" colSpan={4}>
                      <p>
                        کۆی پسولە :{" "}
                        {!isSearched
                          ? reportData?.sellData.sell_count
                          : searchReportData?.sellData.sell_count}
                      </p>
                    </Td>
                    <Td className="text-center" colSpan={4}>
                      <p>
                        کۆی گشتی پسولە :{" "}
                        {!isSearched
                          ? formatMoney(
                              reportData?.sellData.total_item_sell_price
                            )
                          : formatMoney(
                              searchReportData?.sellData.total_item_sell_price
                            )}
                      </p>
                    </Td>
                  </Tr>
                  <Tr className="!default-border">
                    <Td className="text-center" colSpan={4}>
                      <p>
                        کۆی داشکاندنی پسولە :{" "}
                        {!isSearched
                          ? formatMoney(reportData?.discountData)
                          : formatMoney(searchReportData?.discountData)}
                      </p>
                    </Td>
                    <Td className="text-center" colSpan={4}>
                      <p>
                        کۆی دوای داشکان :{" "}
                        {!isSearched
                          ? formatMoney(
                              reportData?.sellData.total_item_sell_price -
                                reportData?.discountData
                            )
                          : formatMoney(
                              searchReportData?.sellData.total_item_sell_price -
                                searchReportData?.discountData
                            )}
                      </p>
                    </Td>
                  </Tr>
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
      {print && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={500}
          maxHeight={`90%`}
          isOpen={print}
          onClose={() => setPrint(false)}>
          <PrintModal
            printFn={() => useSellPrint(search || "", from || "", to || "")}
            onClose={() => setPrint(false)}
          />
        </Dialog>
      )}
      {filter && (
        <Dialog
          className="!p-5 rounded-md"
          maxWidth={400}
          maxHeight={`90%`}
          isOpen={filter}
          onClose={() => setFilter(false)}>
          <CustomClose onClick={() => setFilter(false)} />
          <FilterModal onClose={() => setFilter(false)} type="sell_report" />
        </Dialog>
      )}
    </>
  );
};

export default KogaAllReportList;
